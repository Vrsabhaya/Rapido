import { useState } from 'react';
import { 
  DocumentIcon, 
  XMarkIcon, 
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const CertificationUpload = ({ staffMember, onUpdateCertifications }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const allowedFileTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg'
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => allowedFileTypes.includes(file.type));
    
    if (validFiles.length !== selectedFiles.length) {
      setError('Some files were rejected. Only PDF and image files are allowed.');
    } else {
      setError('');
    }

    setFiles(validFiles);
  };

  const handleUpload = async () => {
    setUploading(true);
    setError('');

    try {
      // In a real app, this would be a call to your storage service (e.g., Firebase Storage)
      // Simulating upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const uploadedFiles = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file), // In real app, this would be the storage URL
        status: 'valid',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
      }));

      onUpdateCertifications(uploadedFiles);
      setFiles([]);
      setUploading(false);
    } catch (err) {
      setError('Failed to upload files. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-700">
                Drop files here or click to upload
              </span>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
                accept={allowedFileTypes.join(',')}
              />
            </label>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            PDF, PNG, JPG up to 10MB each
          </p>
        </div>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Files</h4>
          <ul className="divide-y divide-gray-200">
            {files.map((file, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <DocumentIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                </div>
                <button
                  onClick={() => setFiles(files.filter((_, i) => i !== index))}
                  className="text-red-600 hover:text-red-900"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-2 text-sm text-red-600 flex items-center">
          <ExclamationCircleIcon className="h-5 w-5 mr-1" />
          {error}
        </div>
      )}

      {/* Existing Certifications */}
      {staffMember?.certifications?.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Current Certifications</h4>
          <ul className="divide-y divide-gray-200">
            {staffMember.certifications.map((cert) => (
              <li key={cert.id} className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentIcon className="h-5 w-5 text-gray-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{cert.name}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded on {new Date(cert.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      new Date(cert.expiryDate) > new Date()
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {new Date(cert.expiryDate) > new Date() ? (
                        <>
                          <CheckCircleIcon className="mr-1 h-4 w-4" />
                          Valid
                        </>
                      ) : (
                        <>
                          <ExclamationCircleIcon className="mr-1 h-4 w-4" />
                          Expired
                        </>
                      )}
                    </span>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                    >
                      View
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CertificationUpload; 