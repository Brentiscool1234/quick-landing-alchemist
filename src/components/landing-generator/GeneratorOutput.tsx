
import React from 'react';
import { Button } from '../ui-custom/Button';
import GeneratedLanding from '../GeneratedLanding';

interface GeneratorOutputProps {
  content: any;
  city: string;
  state: string;
  keywords: string[];
  onReset: () => void;
  onDownloadText: () => void;
  onDownloadHTML: () => void;
  onSavePage: () => void;
}

const GeneratorOutput: React.FC<GeneratorOutputProps> = ({
  content,
  city,
  state,
  keywords,
  onReset,
  onDownloadText,
  onDownloadHTML,
  onSavePage
}) => {
  return (
    <div className="animate-fade-in">
      <GeneratedLanding content={content} city={city} state={state} keywords={keywords} />
      <div className="mt-8 flex justify-center space-x-4 flex-wrap gap-4">
        <Button variant="outline" onClick={onReset}>
          Create New
        </Button>
        <Button variant="outline" onClick={onDownloadText}>
          Download as Text
        </Button>
        <Button variant="outline" onClick={onDownloadHTML}>
          Download as HTML
        </Button>
        <Button onClick={onSavePage}>
          Save Page
        </Button>
        <Button onClick={() => window.print()}>
          Save as PDF
        </Button>
      </div>
    </div>
  );
};

export default GeneratorOutput;
