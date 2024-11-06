import {
  Field as GardenField,
  Hint,
  Input as GardenInput,
  Label,
  Message,
} from "@zendeskgarden/react-forms";
import { Span } from "@zendeskgarden/react-typography";
import type { Field } from "../data-types";

interface InputProps {
  field: Field;
  onChange?: (value: string) => void;
}

export function Input({ field, onChange }: InputProps): JSX.Element {
  const { label, error, value, name, required, description, type } = field;
  const stepProp: { step?: string } = {};
  const inputType =
    type === "integer" || type === "decimal" ? "number" : "text";

  if (type === "integer") stepProp.step = "1";
  if (type === "decimal") stepProp.step = "any";

  const autocomplete =
    type === "anonymous_requester_email" ? "email" : undefined;

  return (
    <GardenField className="custom-form-field-layout">
      <Label className="custom-title">
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      <GardenInput
        name={name}
        type={inputType}
        defaultValue={
          value && value !== "" ? (value as string) : `Enter ${label}`
        }
        validation={error ? "error" : undefined}
        required={required}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        autoComplete={autocomplete}
        className="custom-input"
        {...stepProp}
      />
      {error && <Message validation="error">{error}</Message>}
      {description && (
        <Hint dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </GardenField>
  );
}
