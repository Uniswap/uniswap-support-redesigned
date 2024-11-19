import { Field as GardenField, Hint, Textarea, Label, Message } from '@zendeskgarden/react-forms';
import { Span } from '@zendeskgarden/react-typography';
import type { Field } from '../../data-types';
import { useWysiwyg } from './useWysiwyg';
import styled from 'styled-components';

interface TextAreaProps {
  field: Field;
  hasWysiwyg: boolean;
  baseLocale: string;
  hasAtMentions: boolean;
  userRole: string;
  brandId: number;
  onChange: (value: string) => void;
}

const StyledMessage = styled(Message)`
  .ck.ck-editor + & {
    margin-top: ${(props) => props.theme.space.xs};
  }
`;

export function TextArea({
  field,
  hasWysiwyg,
  baseLocale,
  hasAtMentions,
  userRole,
  brandId,
  onChange,
}: TextAreaProps): JSX.Element {
  const { label, error, value, name, required, description } = field;
  const ref = useWysiwyg({
    hasWysiwyg,
    baseLocale,
    hasAtMentions,
    userRole,
    brandId,
  });

  return (
    <GardenField className="custom-form-field-layout">
      <Label className="custom-title">
        {label}
        {required && <Span aria-hidden="true">*</Span>}
      </Label>
      {/* using ck.ck-reset classname for styling */}
      <Textarea
        ref={ref}
        name={name}
        defaultValue={value && value !== '' ? (value as string) : ''}
        placeholder="Describe your issue."
        validation={error ? 'error' : undefined}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        isResizable
      />
      {error && <StyledMessage validation="error">{error}</StyledMessage>}
      {description && (
        <Hint className="custom-hint" dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </GardenField>
  );
}
