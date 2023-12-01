/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useCallback } from 'react';
import '../../index.css';

interface ImageUploadFieldProps {
  fieldName: string;
  labelText: string;
  fieldType: 'file';
  fieldValue: string | ArrayBuffer | null;
  hasError: boolean;
  onPictureUpload: (fieldName: string, value: string | ArrayBuffer | null) => void;
}

const ImageUploadField = (props: ImageUploadFieldProps) => {
  const onFieldCheck = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files![0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        props.onPictureUpload(props.fieldName, base64Image);
      };

      reader.readAsDataURL(file);
    },
    [props.onPictureUpload, props.fieldName]
  );

  return (
    <fieldset className="form-control">
      <label>{props.labelText}</label>
      <input
        placeholder=""
        type={props.fieldType}
        name={props.fieldName}
        value=""
        onChange={onFieldCheck}
        id={props.fieldName}
        style={{ color: 'rgb(255 255 255 / 0%)' }}
      />

      {props.hasError && <p>{`Error. Please upload the correct picture. JPEG, JPG, PNG < 2MB`}</p>}
      {props.fieldValue && (
        <div className="preview">
          <p>Preview:</p>
          <img
            src={props.fieldValue as string}
            alt="preview"
          />
        </div>
      )}
    </fieldset>
  );
};

export default ImageUploadField;
