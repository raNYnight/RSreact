import '../../index.css';
import { InitFormData } from '../../slices/second-form-slice';
interface SubmitListProps {
  submits: InitFormData[];
}

const SubmitList = ({ submits }: SubmitListProps) => {
  const data = [...submits].reverse();
  return (
    <ul>
      {data.map((submit, index) => (
        <li
          key={index}
          className={index === submits.length - 1 ? 'last-added' : 'none'}
        >
          <p>Name: {submit.name}</p>
          <p>Age: {submit.age}</p>
          <p>Email: {submit.email}</p>
          <p>Country: {submit.country}</p>
          <p>Gender: {submit.gender}</p>
          <p>Accept Terms: {submit.acceptTerms ? 'Yes' : 'No'}</p>
          <p>Password: {submit.password}</p>
          <p>Confirmed Password: {submit.confirmPassword}</p>
          <p>Profile Picture: </p>
          <img
            src={submit.profilePicture as string}
            alt="profile pic"
          />
        </li>
      ))}
    </ul>
  );
};

export default SubmitList;
