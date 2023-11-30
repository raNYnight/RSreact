import React, { useState } from 'react';
import { InitFormData, updateSecondFormData } from '../slices/second-form-slice';
import { useDispatch } from 'react-redux';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      [name]: value,
    }));
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setState((prevProps) => ({
      ...prevProps,
      gender: value,
    }));
  };

  const handlePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setState((prevProps) => ({
        ...prevProps,
        profilePicture: base64Image,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSecondFormData(state));
    console.log(state);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={state.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label>Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label>Gender</label>
          <select
            name="gender"
            value={state.gender}
            onChange={handleGenderChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
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
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SecondFormPage;
