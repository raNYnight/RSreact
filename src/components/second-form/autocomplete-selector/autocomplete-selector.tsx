import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CountryData } from '../../../slices/countries-slice';
import { RootState } from '../../../store/store';
import '../../../index.css';
import FlagEmojiToPNG from './country-flag';

const AutocompleteCountry: React.FC<{
  inputRef?: React.RefObject<HTMLInputElement>;
  onCountryChange?: (fieldName: string, value: string) => void;
  hasError: boolean;
}> = ({ onCountryChange, hasError, inputRef }) => {
  const countriesData = useSelector((state: RootState) => state.countries);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<CountryData[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<CountryData | null>(null);

  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setInputValue(value);

    const filteredSuggestions: CountryData[] = countriesData.filter((country) =>
      country.country.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion: CountryData) => {
    setInputValue(suggestion.country);
    setSelectedSuggestion(suggestion);
    if (onCountryChange) {
      onCountryChange('country', suggestion.country);
    }
    setSuggestions([]);
  };
  const handleInputClick = () => {
    if (suggestions.length === 0) {
      setSuggestions(countriesData);
    } else {
      setSuggestions([]);
    }
  };

  const handleInputBlur = () => {
    blurTimeoutRef.current = setTimeout(() => {
      if (!selectedSuggestion) {
        setSuggestions([]);
      }
    }, 200);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab' && suggestions.length > 0) {
      event.preventDefault();
      setSelectedSuggestion(suggestions[0]);
      setInputValue(suggestions[0].country);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!(target.id === 'country-input') && !target.classList.contains('suggestion')) {
        setSuggestions([]);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!inputValue) {
      setSelectedSuggestion(null);
    }
  }, [inputValue]);

  return (
    <fieldset className="form-control">
      <label htmlFor="country">Select country</label>
      <div className="control-wrapper">
        {selectedSuggestion && (
          <span>
            <FlagEmojiToPNG flag={selectedSuggestion!.flag} />
          </span>
        )}
        <input
          type="text"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
          placeholder="Select country"
          id="country-input"
          ref={inputRef}
        />
        <ul
          className="suggestions"
          style={{ display: suggestions.length > 0 ? 'block' : 'none' }}
        >
          {suggestions.map((suggestion: CountryData, index: number) => {
            return (
              <li
                role="option"
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`suggestion ${selectedSuggestion === suggestion ? 'selected' : ''}`}
              >
                {<FlagEmojiToPNG flag={suggestion.flag} />} {suggestion.country}
              </li>
            );
          })}
        </ul>
      </div>
      {hasError && <p>{`Error. Please select the country".`}</p>}
    </fieldset>
  );
};

export default AutocompleteCountry;
