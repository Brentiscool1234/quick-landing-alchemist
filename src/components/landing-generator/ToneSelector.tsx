
import React from 'react';

interface ToneSelectorProps {
  tone: string;
  setTone: React.Dispatch<React.SetStateAction<string>>;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ tone, setTone }) => {
  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
    { value: 'conversational', label: 'Conversational' },
    { value: 'enthusiastic', label: 'Enthusiastic' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        Content Tone
      </label>
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {toneOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ToneSelector;
