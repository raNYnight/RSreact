export async function getFileAsBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Unable to read file.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error occurred while reading file.'));
    };

    reader.readAsDataURL(file);
  });
}
