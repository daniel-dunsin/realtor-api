'use client';
import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { BiUpload } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { v4 } from 'uuid';
import ContentBox from '../dashboard/ContentBox';

const fileTypes = ['JPEG', 'JPG', 'PNG', 'GIF', 'WEBP'];

interface FileRevamped {
  _id: number;
  file: File;
}

const Media = () => {
  const [files, setFiles] = React.useState<FileRevamped[]>([]);

  const handleChange = (file: File[]) => {
    const fileRevamped: any = [...file].map((file) => ({
      file,
      _id: v4(),
    }));

    setFiles([...files, ...fileRevamped]);
  };

  const removeImage = (_id: number) => {
    setFiles((prev) => prev.filter((file) => file._id !== _id));
  };

  return (
    <ContentBox header='Property Media' headersize={24}>
      <FileUploader
        multiple={true}
        handleChange={handleChange}
        name='file'
        types={fileTypes}
      >
        <div className='media-container'>
          <div>
            <span>
              <BiUpload />
            </span>
            Drag & drop images here
          </div>
        </div>
      </FileUploader>

      <div
        className='files-list field-flex'
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {files?.map((file, index) => {
          return (
            <article>
              <img src={URL.createObjectURL(file.file)} alt='' />
              <footer>
                <p>
                  {file.file.name?.length > 25
                    ? file.file.name.slice(0, 25) + '...'
                    : file.file.name}
                </p>

                <i onClick={() => removeImage(file._id)}>
                  <MdClose />
                </i>
              </footer>
            </article>
          );
        })}
      </div>
    </ContentBox>
  );
};

export default Media;
