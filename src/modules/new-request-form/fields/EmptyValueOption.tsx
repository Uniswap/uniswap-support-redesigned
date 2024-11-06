import { Span } from "@zendeskgarden/react-typography";
import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";

export function EmptyValueOption(): ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <Span aria-hidden="true">Select an option</Span>
      <Span hidden>
        {t("new-request-form.dropdown.empty-option", "Select an option")}
      </Span>
    </>
  );
}
