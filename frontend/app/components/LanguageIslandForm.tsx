import React, { useState } from 'react';

const LanguageIslandForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    city: '',
    profession: '',
    relationship: '',
    language: 'German',
    topic: '',
  });

  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
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
        setOutput(data.output);
      } else {
        setOutput('No output returned. Check your input.');
      }
    } catch (err) {
      setOutput('Error generating island.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="age" type="number" placeholder="Age" onChange={handleChange} className="w-full p-2 border" />
        <input name="city" type="text" placeholder="City" onChange={handleChange} className="w-full p-2 border" />
        <input name="profession" type="text" placeholder="Profession" onChange={handleChange} className="w-full p-2 border" />

        <select name="relationship" onChange={handleChange} className="w-full p-2 border">
          <option value="">Relationship Status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="in a relationship">In a relationship</option>
        </select>

        <select name="language" value={formData.language} onChange={handleChange} className="w-full p-2 border">
          <option value="German">German</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>

        <select name="topic" onChange={handleChange} className="w-full p-2 border">
          <option value="">Choose a topic</option>
          <option value="restaurant">At a restaurant</option>
          <option value="train station">At the train station</option>
          <option value="hotel">At a hotel</option>
          <option value="ordering food">Ordering food</option>
          <option value="shopping">Shopping</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          {loading ? 'Generating...' : 'Generate Language Island'}
        </button>
      </form>

      {output && (
        <div className="mt-6 p-4 border rounded bg-gray-800 whitespace-pre-line">
          <h3 className="font-semibold mb-2">Generated Sentences:</h3>
          {output}
        </div>
      )}
    </div>
  );
};

export default LanguageIslandForm;
