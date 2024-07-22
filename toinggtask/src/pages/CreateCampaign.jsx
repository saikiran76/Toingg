import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import axios from 'axios';
import Input from '../components/Input';

const CreateCampaign = ({ authToken }) => {
  const [title, setTitle] = useState('');
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('');
  const [script, setScript] = useState('');
  const [purpose, setPurpose] = useState('');
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [calendar, setCalendar] = useState('10Am to 10Pm IST');
  const [firstLine, setFirstLine] = useState('');
  const [tone, setTone] = useState('');
  const [postCallAnalysis, setPostCallAnalysis] = useState(false);
  const [languages, setLanguages] = useState(["english", "hindi"]);
  const [voices, setVoices] = useState(["selected voice"]); // Ensure these are correct
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.set(formRef.current, { x: -500, opacity: 0 }); 

      gsap.to(formRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out', 
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (script.length < 200) {
      setError('Script must have a minimum of 200 characters.');
      return;
    }
    if (!voices.includes(voice)) {
      setError('Selected voice is not valid.');
      return;
    }
    try {
      const response = await axios.post(
        `https://www.toingg.com/api/v3/create_campaign/`,
        {
          title,
          voice,
          language,
          script,
          purpose,
          knowledgeBase,
          calendar,
          firstLine,
          tone,
          postCallAnalysis,
          postCallAnalysisSchema: {}
        },
        {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        }
      );
      setSuccess(true);
      console.log('Campaign created:', response.data);
    } catch (err) {
        console.error('Failed to create campaign:', err.response?.data || err.message);
        setError('Failed to create campaign: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className='bg-[#181A1B] w-[50em] absolute top-[7%] left-[18%] z-50 rounded-md p-4'>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className='flex gap-4 m-3'>
            <div className='left'>
                <Input title={title} handleChange={(e)=> setTitle(e.target.value)} placeholder='Title'/>
                <select className='mr-2 mt-4 rounded text-black' value={voice} onChange={(e) => setVoice(e.target.value)} required>
                    <option value="">Select Voice</option>
                    {voices.map((voice) => (
                        <option key={voice} value={voice}>
                        {voice}
                        </option>
                    ))}
                </select>
                <select className='mr-2 mt-4 rounded text-black' value={language} onChange={(e) => setLanguage(e.target.value)} required>
                    <option value="">Select Language</option>
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>
                        {lang}
                        </option>
                ))}
                </select>
                <textarea
                    className='block mt-4 h-[10em] w-[19em] rounded p-2 text-white bg-black'
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="Script (min 200 characters)"
                    required
                />
            </div>

            <div className='right pl-4'>
                <Input title={purpose} handleChange={(e)=>setPurpose(e.target.value)} placeholder='The purpose'/>
                <Input title={knowledgeBase} handleChange={(e)=>setKnowledgeBase(e.target.value)} placeholder='Knowledge base'/>
                <Input title={calendar} handleChange={(e)=>setCalendar(e.target.value)} placeholder='Calendar'/>
                <Input title={firstLine} handleChange={(e)=>setFirstLine(e.target.value)} placeholder='First line'/>
                <Input title={tone} handleChange={(e)=>setTone(e.target.value)} placeholder='Tone'/>
            </div>
        </div>
        <label className='mt-3'>
          Post Call Analysis:
          <input
            type="checkbox"
            checked={postCallAnalysis}
            onChange={(e) => setPostCallAnalysis(e.target.checked)}
          />
        </label>
        <button type='submit' className='p-2 mt-3 text-md rounded-[0.4rem] w-[10em] border-gray-500 border-[1px] bg-[#2e615b] hover:bg-[#1c3a37] duration-300 flex justify-center font-semibold items-center'>
            Create
        </button>
      </form>
      {error && <p className='text-red-500'>{error}</p>}
      {success && <p className='text-green-500'>Campaign created successfully!</p>}
    </div>
  );
};

export default CreateCampaign;
