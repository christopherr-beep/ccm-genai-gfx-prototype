import React, { useState } from 'react';
import { Language } from '../types';
import { X, AlertCircle } from 'lucide-react';

interface GenerateGFXModalProps {
  languages: Language[];
  onConfirm: (selectedLanguages: string[]) => void;
  onCancel: () => void;
}

export const GenerateGFXModal: React.FC<GenerateGFXModalProps> = ({
  languages,
  onConfirm,
  onCancel,
}) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    languages.map(lang => lang.code)
  );

  const toggleLanguage = (code: string) => {
    setSelectedLanguages(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const toggleAll = () => {
    if (selectedLanguages.length === languages.length) {
      setSelectedLanguages([]);
    } else {
      setSelectedLanguages(languages.map(lang => lang.code));
    }
  };

  const handleConfirm = () => {
    if (selectedLanguages.length > 0) {
      onConfirm(selectedLanguages);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Generate GenAI GFX Cards</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-900">
              This will generate GenAI GFX cards for all eligible languages. The generation process may take a few moments per language.
            </p>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Select Languages</h3>
              <button
                onClick={toggleAll}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {selectedLanguages.length === languages.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-3">
              {languages.map(lang => (
                <label
                  key={lang.code}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(lang.code)}
                    onChange={() => toggleLanguage(lang.code)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">{lang.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {selectedLanguages.length} of {languages.length} language(s) selected
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedLanguages.length === 0}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Generate {selectedLanguages.length} Card(s)
          </button>
        </div>
      </div>
    </div>
  );
};
