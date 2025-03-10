
import React, { useState } from 'react';
import { Button } from '../ui-custom/Button';
import { Badge } from '../ui-custom/Badge';

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

interface KeywordInputProps {
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ keywords, setKeywords }) => {
  const [keyword, setKeyword] = useState('');

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

  return (
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
  );
};

export default KeywordInput;
