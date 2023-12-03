/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/header';
import AutocompleteCountry from '../components/second-form/autocomplete-selector/autocomplete-selector';
import { CheckField } from '../components/second-form/form-check-field/form-check-field';
import { Field } from '../components/second-form/form-field/form-field';
import GenderField from '../components/second-form/form-gender-field/form-gender-field';
import ImageUploadField from '../components/second-form/form-picture-field/form-picture-field';
import PasswordField from '../components/second-form/password-field/password-field';
import { InitFormData, updateSecondFormData } from '../slices/second-form-slice';
import { formSchema } from '../utils/yup-validation-schema/yup-validation-schema';
import { updateLastAddedItem } from '../slices/store-slice';

const SecondFormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState<InitFormData>({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTerms: false,
    profilePicture: null,
    country: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    age: false,
    email: false,
    password: false,
    confirmPassword: false,
    gender: false,
    acceptTerms: false,
    profilePicture: false,
    country: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const validateField = async (fieldName: string, state: InitFormData) => {
    try {
      await formSchema.validateAt(fieldName, state);

      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: false,
      }));
    } catch (err) {
      setIsFormValid(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: true,
      }));
    }
  };

  const onFieldChange = async (fieldName: string, value: string | boolean | ArrayBuffer | null) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        [fieldName]: value,
      };
      validateField(fieldName, newState);
      return newState;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateLastAddedItem(state));
    dispatch(updateSecondFormData(state));
    navigate('/');
  };

  useEffect(() => {
    const hasError = Object.values(errors).some((error) => error);
    if (
      state.name &&
      state.acceptTerms &&
      state.age &&
      state.password &&
      state.confirmPassword &&
      state.country &&
      state.gender &&
      state.profilePicture &&
      state.email
    ) {
      setIsFormValid(!hasError);
    }
  }, [errors]);

  return (
    <div className="container">
      <Header />
      <h2>Form with React Hook Form</h2>
      <form onSubmit={onSubmit}>
        <Field
          labelText="Name"
          fieldType="text"
          fieldName="name"
          fieldValue={state.name}
          hasError={errors.name}
          onFieldChange={onFieldChange}
        />
        <Field
          labelText="Age"
          fieldType="number"
          fieldName="age"
          fieldValue={state.age}
          hasError={errors.age}
          onFieldChange={onFieldChange}
        />
        <PasswordField
          labelText="Password"
          fieldType="password"
          fieldName="password"
          fieldValue={state.password}
          hasError={errors.password}
          onFieldChange={onFieldChange}
        />
        <Field
          labelText="Confirm password"
          fieldType="password"
          fieldName="confirmPassword"
          fieldValue={state.confirmPassword}
          hasError={errors.confirmPassword}
          onFieldChange={onFieldChange}
        />
        <GenderField
          labelText="Gender"
          fieldName="gender"
          fieldValue={state.gender}
          hasError={errors.gender}
          onGenderChange={onFieldChange}
        />
        <Field
          labelText="Email"
          fieldType="text"
          fieldName="email"
          fieldValue={state.email}
          hasError={errors.email}
          onFieldChange={onFieldChange}
        />
        <CheckField
          labelText="Accept terms"
          fieldName="acceptTerms"
          fieldType="checkbox"
          fieldValue={state.acceptTerms}
          hasError={errors.acceptTerms}
          onFieldCheck={onFieldChange}
        />
        <ImageUploadField
          labelText="Profile picture"
          fieldName="profilePicture"
          fieldType="file"
          fieldValue={state.profilePicture}
          hasError={errors.profilePicture}
          onPictureUpload={onFieldChange}
        />
        <AutocompleteCountry
          onCountryChange={onFieldChange}
          hasError={errors.country}
        />

        <div className="form-control-submit">
          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              cursor: !isFormValid ? 'not-allowed' : 'pointer',
              backgroundColor: !isFormValid ? '#949494' : '#a1ccd1',
            }}
          >
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecondFormPage;
