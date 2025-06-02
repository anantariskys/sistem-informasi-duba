import React, { useEffect, useState } from 'react';

interface FileInputProps {
  initialFileUrl?: string;
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ initialFileUrl, onFileChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialFileUrl);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(initialFileUrl); // fallback saat file dihapus
    }
  }, [file, initialFileUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      onFileChange(selected);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(undefined);
    onFileChange(null);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Foto Tugas Guru
      </label>

      {previewUrl ? (
        <div className="relative w-32 h-32 rounded overflow-hidden border shadow group">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute inset-0 bg-black bg-opacity-50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            Hapus
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <span className="text-sm text-gray-500 text-center">Klik untuk upload</span>
        </label>
      )}
    </div>
  );
};

export default FileInput;
