import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ValidationError } from 'yup';
import Header from '../components/header/header';
import AutocompleteCountry from '../components/second-form/autocomplete-selector/autocomplete-selector';
import { updateFirstFormData } from '../slices/first-form-slice';
import { InitFormData } from '../slices/second-form-slice';
import { getFileAsBase64 } from '../utils/form-utils/converFileToBase64';
import { calculatePasswordStrength } from '../utils/form-utils/passwordStrength';
import { formSchema } from '../utils/yup-validation-schema/yup-validation-schema';
import { useNavigate } from 'react-router-dom';

const FirstFormPage = () => {
  const navigate = useNavigate();
  const initErrors = {
    name: false,
    age: false,
    email: false,
    password: false,
    confirmPassword: false,
    gender: false,
    acceptTerms: false,
    profilePicture: false,
    country: false,
  };
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(initErrors);
  const [passwordStrength, setPasswordStrength] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handlePasswordChange = () => {
    if (passwordRef.current?.value) {
      const strength = calculatePasswordStrength(passwordRef.current?.value);
      setPasswordStrength(strength);
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    let profilePictureBase64 = '';
    if (profilePictureRef.current?.files?.[0]) {
      try {
        profilePictureBase64 = await getFileAsBase64(profilePictureRef.current.files[0]);
      } catch (error) {
        console.error('Error converting profile picture to base64:', error);
      }
    }

    const formData: InitFormData = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      acceptTerms: acceptTermsRef.current?.checked || false,
      profilePicture: profilePictureBase64,
      country: countryRef.current?.value || '',
    };

    const isFormValid = await formSchema.isValid(formData);

    if (isFormValid) {
      console.log('Form is valid', formData);
      dispatch(updateFirstFormData(formData));
      navigate('/');
    } else {
      try {
        console.log('validation form', formData);
        await formSchema.validate(formData, { abortEarly: false });
      } catch (validationError) {
        if (validationError instanceof ValidationError) {
          const errorsToUpdate = validationError.inner.reduce((acc, error) => {
            const path = error.path || '';
            return {
              ...acc,
              [path]: true,
            };
          }, {});
          console.log('errorsToUpdate', errorsToUpdate);
          setErrors(() => {
            return {
              ...initErrors,
              ...errorsToUpdate,
            };
          });
        }
      }
    }
  };
  return (
    <div className="container">
      <Header />
      <h2>Form with uncontrolled components approach</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="form-control">
          <label>Name:</label>
          <input
            type="text"
            ref={nameRef}
          />
          {errors.name && <p>{`Error. Please fill in the correct value for name.`}</p>}
        </fieldset>
        <fieldset className="form-control">
          <label>Age:</label>
          <input
            type="number"
            ref={ageRef}
          />
          {errors.age && <p>{`Error. Please fill in the correct value for age.`}</p>}
        </fieldset>
        <fieldset className="form-control">
          <label>Email:</label>
          <input
            type="email"
            ref={emailRef}
          />
          {errors.email && <p>{`Error. Please fill in the correct value for email.`}</p>}
        </fieldset>
        <fieldset className="form-control">
          <label>Password:</label>
          <input
            type="password"
            ref={passwordRef}
            onChange={handlePasswordChange}
          />
          <span className="password-strength">Password Strength: {passwordStrength}</span>
          {errors.password && <p>{`Error. Please fill in the correct value for password.`}</p>}
        </fieldset>
        <fieldset className="form-control">
          <label>Confirm Password:</label>
          <input
            type="password"
            ref={confirmPasswordRef}
          />
          {errors.confirmPassword && <p>{`Error. Passwords do not match`}</p>}
        </fieldset>
        <fieldset className="form-control">
          <label>Gender:</label>
          <select ref={genderRef}>
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p>{`Error. Please select gender`}</p>}
        </fieldset>
        <fieldset className="form-control">
          <label>Accept Terms: </label>
          <input
            type="checkbox"
            ref={acceptTermsRef}
          />
          {errors.acceptTerms && <p>{`Error. Please accept terms`}</p>}
        </fieldset>

        <fieldset className="form-control">
          <label>Profile Picture</label>
          <input
            type="file"
            ref={profilePictureRef}
          />
          {errors.profilePicture && <p>{`Error. Please upload a correct profile picture`}</p>}
        </fieldset>
        <AutocompleteCountry
          hasError={errors.country}
          inputRef={countryRef}
        />
        <div className="form-control-submit">
          <button type="submit">Submit form</button>
        </div>
      </form>
    </div>
  );
};

export default FirstFormPage;
