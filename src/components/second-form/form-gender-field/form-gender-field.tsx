/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback } from 'react';
import '../../../index.css';
interface GenderFieldProps {
  fieldName: string;
  labelText: string;
  fieldValue: string;
  hasError: boolean;
  onGenderChange: (fieldName: string, value: string) => void;
}

export const GenderField = (props: GenderFieldProps) => {
  const onGenderChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      props.onGenderChange(props.fieldName, event.target.value);
    },
    [props.onGenderChange, props.fieldName]
  );
  return (
    <fieldset className="form-control">
      <label>Gender</label>
      <select
        name="gender"
        value={props.fieldValue}
        onChange={onGenderChange}
      >
        <option
          value=""
          defaultChecked
        ></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {props.hasError && (
        <p>{`Error. Please fill in the correct value for "${props.labelText}".`}</p>
      )}
    </fieldset>
  );
};

export default GenderField;
