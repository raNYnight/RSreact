import { useSelector } from 'react-redux';
import '../../index.css';
import { InitFormData } from '../../slices/second-form-slice';
import { RootState } from '../../store/store';
import { deepEqual } from '../../utils/form-utils/objectEqual';
interface SubmitListProps {
  submits: InitFormData[];
}

const SubmitList = ({ submits }: SubmitListProps) => {
  const data = [...submits].reverse();
  const lastAddedItem = useSelector((state: RootState) => state.store.lastAddedItem) || {};

  return (
    <ul>
      {data.map((submit, index) => {
        const isLastItem = index === submits.length - 1;
        const isLastItemAdded = deepEqual(submit, lastAddedItem);
        const liClassName = isLastItem && isLastItemAdded ? 'last-added' : 'form-object';
        return (
          <li
            key={index}
            className={liClassName}
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
        );
      })}
    </ul>
  );
};

export default SubmitList;
