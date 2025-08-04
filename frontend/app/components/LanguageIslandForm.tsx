import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

const initialFormData = {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setOutput('');
    setShowModal(false);
  };

  const cleanNumberedText = (text: string) => {
    return text
      .split('\n')
      .map((line: string) => line.replace(/^\s*\d+[\.\)\-\:\s]+/, '').trim())
      .filter((line: string) => line.length > 0)
      .join('\n');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('http://localhost:5000/api/generate-island', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
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

  const speakWithBrowserTTS = (text: string) => {
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

  const speakWithElevenLabs = async (text: string) => {
    const apiKey = 'YOUR_ELEVENLABS_API_KEY';
    const voiceId = 'YOUR_VOICE_ID';

    if (!apiKey || !voiceId) {
      speakWithBrowserTTS(text);
      return;
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.7,
          },
        }),
      });

      if (!response.ok) throw new Error('ElevenLabs API error');

      const blob = await response.blob();
      const audio = new Audio(URL.createObjectURL(blob));
      audio.play().catch(err => {
        console.error('Audio play failed:', err);
        speakWithBrowserTTS(text);
      });
    } catch (err) {
      console.error('ElevenLabs TTS failed:', err);
      speakWithBrowserTTS(text);
    }
  };

  const playSentence = (sentence: string) => {
    speakWithElevenLabs(sentence);
  };

  const sentences = output.split(/(?<=[.?!])\s+/);

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            {loading ? 'Generating...' : 'Generate Language Island'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-600 text-white py-2 px-4 rounded"
          >
            Reset
          </button>
        </div>
      </form>

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
                    className="text-blue-600 hover:text-blue-800"
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
