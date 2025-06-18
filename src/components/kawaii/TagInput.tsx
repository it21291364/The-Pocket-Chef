"use client";

import React, { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
  label: string;
  icon?: React.ReactNode;
  id: string;
}

const TagInput: React.FC<TagInputProps> = ({ tags, setTags, placeholder, label, icon, id }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(inputValue.trim().toLowerCase())) {
        setTags([...tags, inputValue.trim().toLowerCase()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="mb-6">
      <label htmlFor={id} className="flex items-center text-lg font-medium text-foreground mb-2 font-headline">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </label>
      <div className="flex items-center border border-input rounded-lg p-2 bg-background shadow-kawaii focus-within:ring-2 focus-within:ring-ring">
        <Input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          className="flex-grow border-none focus:ring-0 !shadow-none text-base"
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="flex items-center bg-primary text-primary-foreground px-3 py-1.5 rounded-xl text-sm font-medium shadow-kawaii"
          >
            {tag}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeTag(tag)}
              className="ml-2 h-5 w-5 p-0.5 rounded-full hover:bg-primary-foreground/20 tag-remove-icon"
              aria-label={`Remove ${tag}`}
            >
              <XIcon className="h-3.5 w-3.5 text-primary-foreground" />
            </Button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;

    