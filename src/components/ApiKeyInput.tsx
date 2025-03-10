
import React, { useState, useEffect } from 'react';
import { Button } from './ui-custom/Button';
import { getOpenAIApiKey, setOpenAIApiKey } from '@/services/openai';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  onApiKeySet: (isSet: boolean) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key is already set
    const savedKey = getOpenAIApiKey();
    if (savedKey) {
      setIsSaved(true);
      onApiKeySet(true);
    }
  }, [onApiKeySet]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key.",
        variant: "destructive",
      });
      return;
    }

    setOpenAIApiKey(apiKey.trim());
    setIsSaved(true);
    setApiKey('');
    onApiKeySet(true);

    toast({
      title: "API Key Saved",
      description: "Your OpenAI API key has been saved for this session.",
    });
  };

  const handleRemoveApiKey = () => {
    setOpenAIApiKey('');
    setIsSaved(false);
    onApiKeySet(false);

    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed.",
    });
  };

  return (
    <div className="w-full p-4 border border-border rounded-lg mb-6 bg-card/50">
      <h3 className="text-lg font-medium mb-2">OpenAI API Key</h3>
      {isSaved ? (
        <div className="space-y-2">
          <p className="text-sm text-foreground/70">API key is set for this session</p>
          <Button variant="outline" size="sm" onClick={handleRemoveApiKey}>
            Remove API Key
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-foreground/70 mb-2">
            Enter your OpenAI API key to generate original content. Your key is only stored in memory for this session.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="sk-..."
            />
            <Button onClick={handleSaveApiKey}>
              Save Key
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
