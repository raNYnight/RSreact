import { number, object, ref, string } from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

export const formSchema = object().shape({
  name: string().required(),
  age: number().required(),
  password: string()
    .required('Please enter a password')
    .min(8, 'Password must have at least 8 characters')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
  confirmPassword: string()
    .required('Please re-type your password')
    .oneOf([ref('password')], 'Passwords does not match'),
  gender: string().required('Gender is required'),
  email: string().email('Invalid email address').required('Email is required'),
});
