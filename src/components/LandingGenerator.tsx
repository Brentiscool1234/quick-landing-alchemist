
import React, { useState } from 'react';
import { generateLandingContent } from '@/services/openai';
import { Button } from './ui-custom/Button';
import { Badge } from './ui-custom/Badge';
import GeneratedLanding from './GeneratedLanding';
import { downloadFile, generateTextFile, generateHtmlFile } from '@/utils/exportUtils';

interface KeywordBadgeProps {
  keyword: string;
  onRemove: () => void;
}

const KeywordBadge: React.FC<KeywordBadgeProps> = ({ keyword, onRemove }) => {
  return (
    <Badge className="flex items-center space-x-1 p-2 m-1">
      <span>{keyword}</span>
      <button 
        onClick={onRemove} 
        className="ml-2 h-4 w-4 rounded-full flex items-center justify-center hover:bg-black/10"
      >
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </Badge>
  );
};

const LandingGenerator = () => {
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const addKeyword = () => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  const handleGenerate = async () => {
    if (keywords.length === 0) {
      setError('Please add at least one keyword.');
      return;
    }
    
    if (!city) {
      setError('Please enter a city.');
      return;
    }
    
    if (!state) {
      setError('Please enter a state.');
      return;
    }
    
    setError(null);
    setIsGenerating(true);
    
    try {
      const content = await generateLandingContent({
        keywords,
        city,
        state
      });
      
      setGeneratedContent(content);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setGeneratedContent(null);
    setKeywords([]);
    setCity('');
    setState('');
    setError(null);
  };

  const handleDownloadText = () => {
    if (!generatedContent) return;
    
    const textContent = generateTextFile(generatedContent, city, state, keywords);
    const filename = `${city}-${state}-${keywords[0]}.txt`.toLowerCase().replace(/\s+/g, '-');
    downloadFile(textContent, filename);
  };

  const handleDownloadHTML = () => {
    if (!generatedContent) return;
    
    const htmlContent = generateHtmlFile(generatedContent, city, state, keywords);
    const filename = `${city}-${state}-${keywords[0]}.html`.toLowerCase().replace(/\s+/g, '-');
    downloadFile(htmlContent, filename);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {generatedContent ? (
        <div className="animate-fade-in">
          <GeneratedLanding content={generatedContent} city={city} state={state} keywords={keywords} />
          <div className="mt-8 flex justify-center space-x-4 flex-wrap gap-4">
            <Button variant="outline" onClick={handleReset}>
              Create New
            </Button>
            <Button variant="outline" onClick={handleDownloadText}>
              Download as Text
            </Button>
            <Button variant="outline" onClick={handleDownloadHTML}>
              Download as HTML
            </Button>
            <Button onClick={() => window.print()}>
              Save as PDF
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Keywords <span className="text-xs text-foreground/60">(services, products, focus areas)</span>
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter keywords and press Enter"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2"
                onClick={addKeyword}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap mt-2">
              {keywords.length === 0 && (
                <p className="text-sm text-foreground/60 py-1">No keywords added yet</p>
              )}
              {keywords.map((kw, index) => (
                <KeywordBadge 
                  key={index} 
                  keyword={kw} 
                  onRemove={() => removeKeyword(index)} 
                />
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="e.g., San Francisco"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="e.g., California"
              />
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-red-500 animate-fade-in">
              {error}
            </div>
          )}
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              isLoading={isGenerating}
              onClick={handleGenerate}
              className="transition-all duration-300"
            >
              {isGenerating ? 'Generating...' : 'Generate Landing Page'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingGenerator;
