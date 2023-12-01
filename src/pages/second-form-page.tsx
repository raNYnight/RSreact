import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import AutocompleteCountry from '../components/autocomplete-selector/autocomplete-selector';
import { CheckField } from '../components/form-check-field/form-check-field';
import { Field } from '../components/form-field/form-field';
import GenderField from '../components/form-gender-field/form-gender-field';
import ImageUploadField from '../components/form-picture-field/form-picture-field';
import Header from '../components/header/header';
import { InitFormData, updateSecondFormData } from '../slices/second-form-slice';
import { formSchema } from '../utils/yup-validation-schema/yup-validation-schema';

const SecondFormPage = () => {
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

  const onCountryChange = (value: string) => {
    setState((prevProps) => ({
      ...prevProps,
      country: value,
    }));
  };

  const onFieldChange = useCallback(
    (fieldName: string, value: string | boolean | ArrayBuffer | null) => {
      setState((prevProps) => ({
        ...prevProps,
        [fieldName]: value,
      }));
    },
    []
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = await formSchema.isValid(state, {
      abortEarly: false,
    });

    if (isFormValid) {
      dispatch(updateSecondFormData(state));
      console.log('Form is legit');
    } else {
      formSchema.validate(state, { abortEarly: false }).catch((err) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const errors = err.inner.reduce((acc: any, error: { path: any }) => {
          return {
            ...acc,
            [error.path]: true,
          };
        }, {});
        console.log('Form is not legit');
        setErrors(() => errors);
      });
    }
  };
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
        <Field
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
          onCountryChange={onCountryChange}
          hasError={errors.country}
        />

        <div className="form-control">
          <label></label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SecondFormPage;
