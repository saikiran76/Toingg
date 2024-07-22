import React, { useState } from 'react';
import axios from 'axios';

const CallHandling = ({ authToken }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [callId, setCallId] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [transcription, setTranscription] = useState('');
  const [postCallAnalysis, setPostCallAnalysis] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await axios.post(
        `https://www.toingg.com/api/v3/make_call/`,
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
      console.log('Call initiated:', response.data);
    } catch (err) {
      console.error('Failed to initiate call:', err.response?.data || err.message);
      setError('Failed to initiate call: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleCallStatus = async () => {
    try {
      const response = await axios.get(
        `https://www.toingg.com/api/v3/call_status?callId=${callId}/`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      setCallStatus(response.data);
      console.log('Call status:', response.data);
    } catch (err) {
      console.error('Failed to retrieve call status:', err.response?.data || err.message);
      setError('Failed to retrieve call status: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleGetTranscription = async () => {
    try {
      const response = await axios.get(
        `https://www.toingg.com/api/v3/get_transcription/${callId}/`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      setTranscription(response.data);
      console.log('Transcription:', response.data);
    } catch (err) {
      console.error('Failed to retrieve transcription:', err.response?.data || err.message);
      setError('Failed to retrieve transcription: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handlePostCallAnalysis = async () => {
    try {
      const response = await axios.get(
        `https://www.toingg.com/api/v3/post_call_analysis/${callId}/`,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        }
      );
      setPostCallAnalysis(response.data);
      console.log('Post call analysis:', response.data);
    } catch (err) {
      console.error('Failed to retrieve post call analysis:', err.response?.data || err.message);
      setError('Failed to retrieve post call analysis: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className='bg-[#181A1B] w-[60em] absolute top-[7%] left-[18%] z-50 rounded-md p-4'>
      <form onSubmit={handleCsvUpload}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setCsvFile(e.target.files[0])}
          required
        />
        <button type="submit" className='p-2 mt-3 text-md rounded-[0.4rem] w-[10em] border-gray-500 border-[1.5px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-center font-semibold items-center text-sm'>
          Upload CSV
        </button>
      </form>
      <div className='mt-4'>
        <input
          type="text"
          value={callId}
          onChange={(e) => setCallId(e.target.value)}
          placeholder="Enter Call ID"
          required
          className='block mt-5 w-full rounded p-2 text-white bg-black'
          />
          <div className='flex gap-3'>
            <button onClick={handleCallStatus} className='p-2 mt-3 text-md rounded-[0.4rem] w-[10em] border-gray-500 border-[1.5px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-center font-semibold items-center text-sm'>
              Get Call Status
            </button>
            <button onClick={handleGetTranscription} className='p-2 mt-3 text-md rounded-[0.4rem] w-[10em] border-gray-500 border-[1.5px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-center font-semibold items-center text-sm'>
              Get Transcription
            </button>
            <button onClick={handlePostCallAnalysis} className='p-2 mt-3 text-md rounded-[0.4rem] w-[10em] border-gray-500 border-[1.5px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-center font-semibold items-center text-sm'>
              Post Call Analysis
            </button>
          </div>
        </div>
        {callStatus && (
          <div className='mt-4 text-white'>
            <h3>Call Status:</h3>
            <pre>{JSON.stringify(callStatus, null, 2)}</pre>
          </div>
        )}
        {transcription && (
          <div className='mt-4 text-white'>
            <h3>Transcription:</h3>
            <pre>{JSON.stringify(transcription, null, 2)}</pre>
          </div>
        )}
        {postCallAnalysis && (
          <div className='mt-4 text-white'>
            <h3>Post Call Analysis:</h3>
            <pre>{JSON.stringify(postCallAnalysis, null, 2)}</pre>
          </div>
        )}
        {error && <p className='text-red-500'>{error}</p>}
        {success && <p className='text-green-500'>Action completed successfully!</p>}
      </div>
    );
};
  
export default CallHandling;

