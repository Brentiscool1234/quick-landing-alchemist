
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { generateLandingContent } from '@/services/openai';
import { downloadFile, generateTextFile, generateHtmlFile } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';
import { useLandingPages } from '@/contexts/LandingPagesContext';
import GeneratorForm from './landing-generator/GeneratorForm';
import GeneratorOutput from './landing-generator/GeneratorOutput';

const LandingGenerator = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [tone, setTone] = useState('professional');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addLandingPage } = useLandingPages();

  const handleGenerate = async () => {
    if (!isApiKeySet) {
      setError('Please set your OpenAI API key first.');
      return;
    }
    
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
        state,
        tone
      });
      
      setGeneratedContent(content);
      toast({
        title: "Content Generated",
        description: "Your landing page content has been successfully generated.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate content. Please try again.';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
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
    
    toast({
      title: "Downloaded",
      description: "Text file has been downloaded successfully.",
    });
  };

  const handleDownloadHTML = () => {
    if (!generatedContent) return;
    
    const htmlContent = generateHtmlFile(generatedContent, city, state, keywords);
    const filename = `${city}-${state}-${keywords[0]}.html`.toLowerCase().replace(/\s+/g, '-');
    downloadFile(htmlContent, filename);
    
    toast({
      title: "Downloaded",
      description: "HTML file has been downloaded successfully.",
    });
  };

  const handleSavePage = () => {
    if (!generatedContent) return;
    
    const newPage = {
      id: uuidv4(),
      city,
      state,
      keywords,
      tone,
      createdAt: new Date(),
      content: generatedContent
    };
    
    addLandingPage(newPage);
    
    toast({
      title: "Page Saved",
      description: "Your landing page has been saved successfully.",
    });
    
    navigate(`/view-page/${newPage.id}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {generatedContent ? (
        <GeneratorOutput 
          content={generatedContent}
          city={city}
          state={state}
          keywords={keywords}
          onReset={handleReset}
          onDownloadText={handleDownloadText}
          onDownloadHTML={handleDownloadHTML}
          onSavePage={handleSavePage}
        />
      ) : (
        <GeneratorForm
          isApiKeySet={isApiKeySet}
          setIsApiKeySet={setIsApiKeySet}
          keywords={keywords}
          setKeywords={setKeywords}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          tone={tone}
          setTone={setTone}
          error={error}
          isGenerating={isGenerating}
          onGenerate={handleGenerate}
        />
      )}
    </div>
  );
};

export default LandingGenerator;
