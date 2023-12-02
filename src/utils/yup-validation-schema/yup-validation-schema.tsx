import { boolean, number, object, ref, string } from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const calculateFileSize = (base64: string): number => {
  const yourBase64String = base64.substring(base64.indexOf(',') + 1);
  const bits = yourBase64String.length * 6;
  const bytes = bits / 8;
  const kb = Math.ceil(bytes / 1000);

  return kb;
};

export const formSchema = object().shape({
  name: string()
    .required('Please enter your name')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter'),
  age: number()
    .required('Please enter your age')
    .typeError('Age must be a number')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  password: string()
    .required('Please enter a password')
    .min(8, 'Password must have at least 8 characters')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase'))
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must have a special symbol'),
  confirmPassword: string()
    .required('Please re-type your password')
    .oneOf([ref('password')], 'Passwords does not match'),
  gender: string().required('Gender is required'),
  email: string().email('Invalid email address').required('Email is required'),
  acceptTerms: boolean().oneOf([true], 'Checkbox must be checked'),
  profilePicture: string()
    .test('fileSize', 'Размер файла не должен превышать 2 МБ', (value) => {
      if (!value) return true;

      const fileSizeInKB = calculateFileSize(value);
      const maxSizeInKB = 2000; // 2 МБ
      return fileSizeInKB <= maxSizeInKB;
    })
    .test('fileType', 'Недопустимое расширение файла', (value) => {
      if (!value) return true;
      const acceptedExtensions = ['jpeg', 'jpg', 'png'];
      const extension = value.split(';')[0].split('/')[1];
      return acceptedExtensions.includes(extension);
    }),
  country: string().required('Country is required'),
});
