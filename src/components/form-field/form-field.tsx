/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback } from 'react';
import '../../index.css';

interface FieldProps {
  fieldName: string;
  labelText: string;
  fieldType: string;
  fieldValue: string;
  hasError: boolean;
  onFieldChange: (fieldName: string, value: string) => void;
}

export const Field = (props: FieldProps) => {
  const onFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      props.onFieldChange(props.fieldName, event.target.value);
    },
    [props.onFieldChange, props.fieldName]
  );
  return (
    <fieldset>
      <label
        htmlFor={props.fieldName}
        className="form-control"
      >
        {props.labelText}
      </label>

      <input
        type={props.fieldType}
        name={props.fieldName}
        id={props.fieldName}
        onChange={onFieldChange}
        value={props.fieldValue}
      />

      {props.hasError && (
        <p>{`Error. Please fill in the correct value for "${props.labelText}".`}</p>
      )}
    </fieldset>
  );
};
