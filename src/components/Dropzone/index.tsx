import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface IDragDropImage {
  fileData: any;
  setFieldValue: any;
  disabled: any;
}
import Image from 'next/image';
export const imageType = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg'],
  'image/gif': ['.gif'],
};

function DragDropImage({
  fileData,
  setFieldValue,
  disabled = false,
}: IDragDropImage) {
  const _onRemoveImage = (event: any) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      setFieldValue('image', '');
    } catch (e) {
      console.error(e);
    }
  };

  const blobUrlToFile = (blobUrl: string): Promise<File> =>
    new Promise((resolve) => {
      fetch(blobUrl).then((res) => {
        res.blob().then((blob) => {
          const file = new File([blob], 'image.png', { type: blob.type });
          setFieldValue('image', file);
          resolve(file);
        });
      });
    });

  useEffect(() => {
    if (fileData && typeof fileData == 'string') {
      blobUrlToFile(fileData);
    }
  }, [fileData]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: imageType,
    onDrop: (acceptedFiles) => {
      setFieldValue('image', acceptedFiles[0]);
    },
  });

  return (
    <React.Fragment>
      {disabled ? (
        <div className={`bg-secondary `}></div>
      ) : (
        <div>
          <div
            className={`image_background upload-image ${
              fileData ? 'border-none-background' : ''
            }`}
            {...getRootProps()}
          >
            <aside
              className={`${
                fileData
                  ? 'w-100 h-100 border-upload-image d-flex justify-content-center align-items-center'
                  : ''
              }`}
            >
              {fileData ? (
                <Image
                  src={
                    typeof fileData == 'string'
                      ? fileData
                      : URL.createObjectURL(fileData)
                  }
                  className={`image-background`}
                  alt="image-background"
                  layout='fill'
                />
              ) : (
                <Image
                  src={`/paper_upload.svg`}
                  alt="img-upload"
                  width={200}
                  height={200}
                />
              )}
            </aside>
            {fileData && (
              <div className={`border-upload-image-remove-icon`}>
                <Image
                  onClick={_onRemoveImage}
                  width={25}
                  height={25}
                  src={`/remove_image_ic.png`}
                  className={`cursor-pointer`}
                  alt="remove-image"
                />
              </div>
            )}
            <input {...getInputProps()} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default DragDropImage;
