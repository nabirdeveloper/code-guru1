import React, { useState, useRef } from 'react';

interface ProjectFormProps {
  initialValues?: {
    title?: string;
    description?: string;
    imageUrl?: string;
    link?: string;
  };
  onSubmit: (data: { title: string; description: string; imageUrl: string; link: string }) => void;
  loading?: boolean;
  onCancel?: () => void;
}

const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET'; // Replace with your Cloudinary upload preset
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME'; // Replace with your Cloudinary cloud name

const ProjectForm: React.FC<ProjectFormProps> = ({ initialValues = {}, onSubmit, loading, onCancel }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [imageUrl, setImageUrl] = useState(initialValues.imageUrl || '');
  const [link, setLink] = useState(initialValues.link || '');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        setError('Image upload failed.');
      }
    } catch {
      setError('Image upload failed.');
    }
    setUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !description.trim() || !link.trim()) {
      setError('All fields are required.');
      return;
    }
    if (!/^https?:\/\//.test(link)) {
      setError('Link must be a valid URL.');
      return;
    }
    if (!imageUrl) {
      setError('Project image is required.');
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), imageUrl, link: link.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="border px-3 py-2 rounded w-full"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Project Link</label>
        <input
          type="url"
          className="border px-3 py-2 rounded w-full"
          value={link}
          onChange={e => setLink(e.target.value)}
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Project Image</label>
        <div className="flex items-center gap-4">
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded" />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="block"
            disabled={loading || uploading}
          />
        </div>
        {uploading && <div className="text-xs text-gray-500 mt-1">Uploading...</div>}
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2 justify-end">
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" disabled={loading}>Cancel</button>
        )}
        <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold" disabled={loading || uploading}>
          {loading ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm; 