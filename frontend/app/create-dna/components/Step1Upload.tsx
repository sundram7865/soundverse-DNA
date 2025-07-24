import React, { useCallback, useState } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

const Step1Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4">Step 1: Upload Audio</h2>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-soundverse-purple bg-gray-800' : 'border-gray-600'}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FaCloudUploadAlt className="text-soundverse-purple text-xl" />
              <span className="truncate max-w-xs">{file.name}</span>
            </div>
            <button 
              onClick={() => setFile(null)}
              className="text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <>
            <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-3" />
            <p className="mb-2">Drag & drop your audio file here</p>
            <p className="text-sm text-gray-400 mb-4">Supports: MP3, WAV, FLAC (Max 50MB)</p>
            <label className="inline-block px-4 py-2 bg-soundverse-purple rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
              Browse Files
              <input 
                type="file" 
                className="hidden" 
                accept=".mp3,.wav,.flac"
                onChange={handleChange}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default Step1Upload;