
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui-custom/Button';
import ApiKeyInput from '../ApiKeyInput';
import KeywordInput from './KeywordInput';
import LocationInput from './LocationInput';
import ToneSelector from './ToneSelector';

interface GeneratorFormProps {
  isApiKeySet: boolean;
  setIsApiKeySet: React.Dispatch<React.SetStateAction<boolean>>;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  tone: string;
  setTone: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  isGenerating: boolean;
  onGenerate: () => void;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({
  isApiKeySet,
  setIsApiKeySet,
  keywords,
  setKeywords,
  city,
  setCity,
  state,
  setState,
  tone,
  setTone,
  error,
  isGenerating,
  onGenerate
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Generate New Landing Page</h2>
        <Link to="/saved-pages">
          <Button variant="outline" size="sm">Saved Pages</Button>
        </Link>
      </div>
      
      <ApiKeyInput onApiKeySet={setIsApiKeySet} />
      
      <KeywordInput keywords={keywords} setKeywords={setKeywords} />
      
      <LocationInput 
        city={city} 
        setCity={setCity} 
        state={state} 
        setState={setState} 
      />
      
      <ToneSelector tone={tone} setTone={setTone} />
      
      {error && (
        <div className="text-sm text-red-500 animate-fade-in">
          {error}
        </div>
      )}
      
      <div className="flex justify-center">
        <Button 
          size="lg" 
          isLoading={isGenerating}
          onClick={onGenerate}
          className="transition-all duration-300"
          disabled={!isApiKeySet}
        >
          {isGenerating ? 'Generating...' : 'Generate Landing Page'}
        </Button>
      </div>
    </div>
  );
};

export default GeneratorForm;
