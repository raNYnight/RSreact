import React, { useCallback, useState } from 'react';
import { InitFormData, updateSecondFormData } from '../slices/second-form-slice';
import { useDispatch } from 'react-redux';
import Header from '../components/header/header';
import { Field } from '../components/form-field/form-field';
import { formSchema } from '../utils/yup-validation-schema/yup-validation-schema';
import GenderField from '../components/form-gender-field/form-gender-field';

const SecondFormPage = () => {
  // const dispatch = useDispatch();
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
    profilePicture: null,
    country: false,
  });

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setState((prevProps) => ({
  //     ...prevProps,
  //     [name]: value,
  //   }));
  // };

  // const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   setState((prevProps) => ({
  //     ...prevProps,
  //     gender: value,
  //   }));
  // };

  // const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files![0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64Image = reader.result;
  //     setState((prevProps) => ({
  //       ...prevProps,
  //       profilePicture: base64Image,
  //     }));
  //   };

  //   reader.readAsDataURL(file);
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   dispatch(updateSecondFormData(state));
  //   console.log(state);
  // };

  const onFieldChange = useCallback((fieldName: string, value: string) => {
    setState((prevProps) => ({
      ...prevProps,
      [fieldName]: value,
    }));
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = await formSchema.isValid(state, {
      abortEarly: false,
    });

    if (isFormValid) {
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
          fieldType="text"
          fieldName="password"
          fieldValue={state.password}
          hasError={errors.password}
          onFieldChange={onFieldChange}
        />
        <Field
          labelText="confirmPassword"
          fieldType="text"
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
        {/* 
    
       
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label>Accept terms</label>
          <input
            type="checkbox"
            name="acceptTerms"
            checked={state.acceptTerms}
            onChange={(event) =>
              setState((prevProps) => ({
                ...prevProps,
                acceptTerms: event.target.checked,
              }))
            }
          />
        </div>
        <div className="form-control">
          <label>Profile picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handlePictureUpload}
          />
        </div>
        <div className="form-control">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={state.country}
            onChange={handleInputChange}
          />
        </div> */}
        <div className="form-control">
          <label></label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SecondFormPage;
