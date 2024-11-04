import {
  FileUpload,
  Field as GardenField,
  Input,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import {
  Close,
  Notification,
  Title,
  useToast,
} from "@zendeskgarden/react-notifications";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import type { AttachmentField } from "../../data-types";
import { FileListItem } from "./FileListItem";
import type { AttachedFile } from "./useAttachedFiles";
import { useAttachedFiles } from "./useAttachedFiles";
import mime from "mime";

interface AttachmentProps {
  field: AttachmentField;
}

async function fetchCsrfToken() {
  const response = await fetch("/api/v2/users/me.json");
  const {
    user: { authenticity_token },
  } = await response.json();
  return authenticity_token as string;
}

export interface UploadFileResponse {
  upload: {
    attachment: {
      file_name: string;
      content_url: string;
    };
    token: string;
  };
}

export function Attachments({ field }: AttachmentProps): JSX.Element {
  const { label, error, name, attachments } = field;
  const {
    files,
    addPendingFile,
    setPendingFileProgress,
    setUploaded,
    removePendingFile,
    removeUploadedFile,
  } = useAttachedFiles(
    attachments.map((value) => ({
      status: "uploaded",
      value,
    })) ?? []
  );

  const { addToast } = useToast();
  const { t } = useTranslation();

  const notifyError = useCallback(
    (fileName: string) => {
      addToast(({ close }) => (
        <Notification type="error">
          <Title>
            {t(
              "new-request-form.attachments.upload-error-title",
              "Upload error"
            )}
          </Title>
          {t(
            "new-request-form.attachments.upload-error-description",
            "There was an error uploading {{fileName}}. Try again or upload another file.",
            { fileName }
          )}

          <Close
            aria-label={t("new-request-form.close-label", "Close")}
            onClick={close}
          />
        </Notification>
      ));
    },
    [addToast, t]
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const csrfToken = await fetchCsrfToken();
      for (const file of acceptedFiles) {
        // fetch doesn't support upload progress, so we use XMLHttpRequest
        const xhr = new XMLHttpRequest();

        const url = new URL(`${window.location.origin}/api/v2/uploads.json`);
        url.searchParams.append("filename", file.name);
        xhr.open("POST", url);

        // If the browser returns a type for the file, use it as the Content-Type header,
        // otherwise try to determine the mime type from the file extension using the mime
        // library. If we can't determine the mime type, we'll fall back to a generic
        // application/octet-stream.
        if (file.type) {
          xhr.setRequestHeader("Content-Type", file.type);
        } else {
          const mimeType = mime.getType(file.name);
          xhr.setRequestHeader(
            "Content-Type",
            mimeType || "application/octet-stream"
          );
        }
        xhr.setRequestHeader("X-CSRF-Token", csrfToken);
        xhr.responseType = "json";

        const pendingId = crypto.randomUUID();

        addPendingFile(pendingId, file.name, xhr);

        xhr.upload.addEventListener("progress", ({ loaded, total }) => {
          const progress = Math.round((loaded / total) * 100);

          // There is a bit of delay between the upload ending and the
          // load event firing, so we don't want to set the progress to 100
          // otherwise it is not clear that the upload is still in progress.
          if (progress <= 90) {
            setPendingFileProgress(pendingId, progress);
          }
        });

        xhr.addEventListener("load", () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const {
              upload: {
                attachment: { file_name, content_url },
                token,
              },
            } = xhr.response as UploadFileResponse;
            setUploaded(pendingId, { id: token, file_name, url: content_url });
          } else {
            notifyError(file.name);
            removePendingFile(pendingId);
          }
        });

        xhr.addEventListener("error", () => {
          notifyError(file.name);
          removePendingFile(pendingId);
        });

        xhr.send(file);
      }
    },
    [
      addPendingFile,
      removePendingFile,
      setPendingFileProgress,
      setUploaded,
      notifyError,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleRemove = async (file: AttachedFile) => {
    if (file.status === "pending") {
      file.xhr.abort();
      removePendingFile(file.id);
    } else {
      const csrfToken = await fetchCsrfToken();
      const token = file.value.id;
      removeUploadedFile(file.value.id);
      await fetch(`/api/v2/uploads/${token}.json`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": csrfToken },
      });
    }
  };

  return (
    <div className="custom-form-field-layout">
      <Label className="custom-title">{label}</Label>
      {error && <Message validation="error">{error}</Message>}
      <FileUpload
        {...getRootProps()}
        isDragging={isDragActive}
        className="!border-0 !bg-light-surface-3 dark:!bg-light-surface-3"
      >
        {isDragActive ? (
          <span>
            {t(
              "new-request-form.attachments.drop-files-label",
              "Drop files here"
            )}
          </span>
        ) : (
          <span className="label-2 !text-light-neutral-1 dark:!text-dark-neutral-1">
            {t(
              "new-request-form.attachments.choose-file-label",
              "Add file or drop files here"
            )}
          </span>
        )}
        <Input {...getInputProps()} />
      </FileUpload>
      {files.map((file) => (
        <FileListItem
          key={file.status === "pending" ? file.id : file.value.id}
          file={file}
          onRemove={() => {
            handleRemove(file);
          }}
        />
      ))}
      {files.map(
        (file) =>
          file.status === "uploaded" && (
            <input
              key={file.value.id}
              type="hidden"
              name={name}
              value={JSON.stringify(file.value)}
            />
          )
      )}
    </div>
  );
}
