
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`relative w-full max-w-md mx-auto h-64 rounded-xl border-2 border-dashed 
        ${isDragActive ? 'border-primary animate-pulse' : 'border-gray-300'} 
        transition-all duration-300 ease-in-out hover:border-primary-light
        bg-fashion-card backdrop-blur-sm cursor-pointer`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="w-full h-full p-2">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 space-y-4">
          <Upload className="w-12 h-12 text-primary animate-float" />
          <div className="text-center space-y-2">
            <p className="text-fashion-text font-medium">
              Drag & drop your image here
            </p>
            <p className="text-fashion-muted text-sm">
              or click to select a file
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
