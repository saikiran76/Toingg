import React, { useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';

const KnowledgeBase = ({ authToken }) => {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://www.toingg.com/api/v3/upload_knowledge_base/`,
        { url },
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess(true);
      console.log('URL uploaded:', response.data);
    } catch (err) {
      console.error('Failed to upload URL:', err.response?.data || err.message);
      setError('Failed to upload URL: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `https://www.toingg.com/api/v3/upload_knowledge_base/`,
        formData,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccess(true);
      console.log('File uploaded:', response.data);
    } catch (err) {
      console.error('Failed to upload file:', err.response?.data || err.message);
      setError('Failed to upload file: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className='bg-[#181A1B] w-[50em] absolute top-[7%] left-[18%] z-50 rounded-md p-4'>
      <form onSubmit={handleUrlSubmit}>
        {/* <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        /> */}
        <Input title={url} handleChange={(e) => setUrl(e.target.value)} placeholder='Enter URL'/>
        <button type="submit" className='p-2 mt-3 text-md rounded-[0.4rem] w-[10em] border-gray-500 border-[1.5px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-center font-semibold items-center text-sm'>
          Upload URL
        </button>
      </form>
      <form className='mt-3 ml-5' onSubmit={handleFileSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit" className='p-2 mt-3 text-md rounded-[0.4rem] w-[10em] border-gray-500 border-[1.5px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-center font-semibold items-center text-sm'>
          Upload File
        </button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
      {success && <p className='text-green-500'>Uploaded successfully!</p>}
    </div>
  );
};

export default KnowledgeBase;
