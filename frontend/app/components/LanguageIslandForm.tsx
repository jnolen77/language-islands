import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

const initialFormData = {
  name: '',
  age: '',
  city: '',
  profession: '',
  relationship: '',
  language: 'German',
  topic: '',
};

const LanguageIslandForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  interface LanguageIslandFormData {
    name: string;
    age: string;
    city: string;
    profession: string;
    relationship: string;
    language: string;
    topic: string;
  }

  interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement> {}

  const handleChange = (e: HandleChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: LanguageIslandFormData) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setOutput('');
    setShowModal(false);
  };

  interface CleanNumberedText {
    (text: string): string;
  }

  const cleanNumberedText: CleanNumberedText = (text) => {
    return text
      .split('\n')
      .map((line: string) => line.replace(/^\s*\d+[\.\)\-\:\s]+/, '').trim())
      .filter((line: string) => line.length > 0)
      .join('\n');
  };

  interface GenerateIslandResponse {
    output?: string;
    [key: string]: any;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('http://localhost:5000/api/generate-island', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data: GenerateIslandResponse = await response.json();
      if (data.output) {
        const cleanedOutput = cleanNumberedText(data.output);
        setOutput(cleanedOutput);
        setShowModal(true);
      } else {
        setOutput('No output returned. Check your input.');
      }
    } catch (err) {
      setOutput('Error generating island.');
    }

    setLoading(false);
  };

  interface SpeakWithBrowserTTS {
    (text: string): void;
  }

  const speakWithBrowserTTS: SpeakWithBrowserTTS = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'de-DE';
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Browser TTS not supported');
    }
  };

  interface SpeakWithElevenLabs {
    (text: string): Promise<void>;
  }

  interface ElevenLabsVoiceSettings {
    stability: number;
    similarity_boost: number;
  }

  interface ElevenLabsRequestBody {
    text: string;
    model_id: string;
    voice_settings: ElevenLabsVoiceSettings;
  }

  const speakWithElevenLabs: SpeakWithElevenLabs = async (text: string): Promise<void> => {
    const apiKey: string = 'YOUR_ELEVENLABS_API_KEY';
    const voiceId: string = 'YOUR_VOICE_ID';

    if (!apiKey || !voiceId) {
      speakWithBrowserTTS(text);
      return;
    }

    try {
      const requestBody: ElevenLabsRequestBody = {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.7,
        },
      };

      const response: Response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('ElevenLabs API error');

      const blob: Blob = await response.blob();
      const audio: HTMLAudioElement = new Audio(URL.createObjectURL(blob));
      audio.play().catch((err: unknown) => {
        console.error('Audio play failed:', err);
        speakWithBrowserTTS(text);
      });
    } catch (err) {
      console.error('ElevenLabs TTS failed:', err);
      speakWithBrowserTTS(text);
    }
  };

  interface PlaySentence {
    (sentence: string): void;
  }

  const playSentence: PlaySentence = (sentence: string): void => {
    
    const germanOnly: string = sentence.replace(/\s*\([^)]*\)\s*$/, '').trim();
    speakWithElevenLabs(germanOnly);
  };

 
  interface ParseSentences {
    (text: string): string[];
  }

  const parseSentences: ParseSentences = (text: string): string[] => {
   
    const lines: string[] = text.split('\n').filter(line => line.trim());
    const sentences: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line: string = lines[i].trim();
      if (!line) continue;
      
      
      if (line.includes('(') && line.includes(')')) {
        sentences.push(line);
      } else {
       
        const nextLine: string | undefined = lines[i + 1];
        if (nextLine && nextLine.trim().startsWith('(') && nextLine.includes(')')) {
          sentences.push(line + ' ' + nextLine.trim());
          i++; 
        } else {
          sentences.push(line);
        }
      }
    }
    
    return sentences;
  };

  const sentences = parseSentences(output);

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="space-y-4">
        <input 
        name='name'
        type='text'
        placeholder='Name'
        value={formData.name || ''}
        onChange={handleChange}
        className="w-full p-2 border bg-[#0a1430] placeholder-white text-white"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border bg-[#0a1430] placeholder-white text-white"
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full p-2 border bg-[#0a1430] placeholder-white text-white"
        />
        <input
          name="profession"
          type="text"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full p-2 border bg-[#0a1430] placeholder-white text-white"
        />
        
        <select
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          className="w-full p-2 border bg-[#0a1430] text-white"
        >
          <option value="">Relationship Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="in a relationship">In a relationship</option>
        </select>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full p-2 border bg-[#0a1430] text-white"
        >
          <option value="German">German</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
        <select
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full p-2 border bg-[#0a1430] text-white"
        >
          <option value="">Choose a topic</option>
          <option value="restaurant">At a restaurant</option>
          <option value="train station">At the train station</option>
          <option value="hotel">At a hotel</option>
          <option value="ordering food">Ordering food</option>
          <option value="shopping">Shopping</option>
        </select>

        <div className="flex gap-4">
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded"
          >
            {loading ? 'Generating...' : 'Generate Language Island'}
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-600 text-white py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white text-black rounded-lg p-6 max-w-2xl w-full shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-lg font-bold"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Generated Sentences</h3>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
              {sentences.map((sentence, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between bg-gray-100 p-3 rounded"
                >
                  <p className="mr-4">{sentence}</p>
                  <button
                    onClick={() => playSentence(sentence)}
                    className="text-blue-600 hover:text-blue-800 flex-shrink-0"
                    title="Play audio"
                  >
                    <Volume2 />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageIslandForm;