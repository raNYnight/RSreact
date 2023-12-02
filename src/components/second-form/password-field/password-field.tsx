/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback, useState } from 'react';
import '../../../index.css';

interface PasswordFieldProps {
  fieldName: string;
  labelText: string;
  fieldType: string;
  fieldValue: string;
  hasError: boolean;
  onFieldChange: (fieldName: string, value: string) => void;
}

export const PasswordField = (props: PasswordFieldProps) => {
  const [passwordStrength, setPasswordStrength] = useState('');

  const onFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      props.onFieldChange(props.fieldName, value);

      if (props.fieldType === 'password') {
        const strength = calculatePasswordStrength(value);
        setPasswordStrength(strength);
      }
    },
    [props.onFieldChange, props.fieldName, props.fieldType]
  );

  const calculatePasswordStrength = (password: string) => {
    if (password.length < 6) {
      return 'Weak';
    } else if (password.length < 10) {
      return 'Medium';
    } else {
      return 'Strong';
    }
  };

  return (
    <fieldset className="form-control">
      <label htmlFor={props.fieldName}>{props.labelText}</label>
      <input
        type={props.fieldType}
        name={props.fieldName}
        id={props.fieldName}
        onChange={onFieldChange}
        value={props.fieldValue}
      />
      {props.fieldType === 'password' && passwordStrength && (
        <span className="password-strength">Password Strength: {passwordStrength}</span>
      )}
      {props.hasError && (
        <p>{`Error. Please fill in the correct value for "${props.labelText}".`}</p>
      )}
    </fieldset>
  );
};

export default PasswordField;
