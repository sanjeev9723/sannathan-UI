import React, { useState, useEffect, useRef } from 'react';
import language from "../screens/images/language.png"


function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // Set 'English' as the default language
  const dropdownRef = useRef(null);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button className="language-selector__button" onClick={toggleDropdown}>
        <img src={language} alt="Language" className="language-icon"/>
      </button>
      {isOpen && (
        <ul className="language-selector__dropdown">
          <li onClick={() => handleLanguageSelect('English')}>English</li>
          <li onClick={() => handleLanguageSelect('Telugu')}>Telugu</li>
          <li onClick={() => handleLanguageSelect('Hindi')}>Hindi</li>
          {/* Add more language options as needed */}
        </ul>
      )}
      {/* <span className="language-selector__selected-language">
        {selectedLanguage}
      </span> */}
    </div>
  );
}

export default LanguageSelector;
