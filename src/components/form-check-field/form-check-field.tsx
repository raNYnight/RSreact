/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback } from 'react';
import '../../index.css';

interface CheckFieldProps {
  fieldName: string;
  labelText: string;
  fieldType: string;
  fieldValue: boolean;
  hasError: boolean;
  onFieldCheck: (fieldName: string, value: boolean) => void;
}

export const CheckField = (props: CheckFieldProps) => {
  const onFieldCheck = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      props.onFieldCheck(props.fieldName, event.target.checked);
    },
    [props.onFieldCheck, props.fieldName]
  );
  return (
    <fieldset className="form-control">
      <label>{props.labelText}</label>
      <input
        type={props.fieldType}
        name={props.fieldName}
        checked={props.fieldValue}
        onChange={onFieldCheck}
      />

      {props.hasError && (
        <p>{`Error. Please fill in the correct value for "${props.labelText}".`}</p>
      )}
    </fieldset>
  );
};
