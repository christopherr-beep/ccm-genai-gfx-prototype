import React, { useEffect } from 'react';
import { Language } from '../types';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { getStatusLabel, getStatusColor, generateGFXCard } from '../services/genAiService';

interface LanguageRowProps {
  language: Language;
  onStatusUpdate: (updates: Partial<Language>) => void;
}

export const LanguageRow: React.FC<LanguageRowProps> = ({ language, onStatusUpdate }) => {
  // Auto-generate when status is queued
  useEffect(() => {
    if (language.gfxStatus === 'queued') {
      onStatusUpdate({ gfxStatus: 'generating' });
      
      generateGFXCard(language.code, language.name)
        .then(card => {
          onStatusUpdate({
            gfxStatus: 'needs_review',
            gfxCardUrl: card.imageUrl,
            gfxPrompt: card.prompt,
          });
        })
        .catch(error => {
          onStatusUpdate({
            gfxStatus: 'failed',
            errorMessage: error.message,
          });
        });
    }
  }, [language.gfxStatus]);

  const getSubStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case 'in_progress':
        return <Loader2 className="w-5 h-5 text-yellow-600 animate-spin" />;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h3 className="font-semibold text-gray-900">{language.name}</h3>
            
            {/* GFX Status Badge */}
            {language.gfxStatus !== 'not_started' && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(language.gfxStatus)}`}>
                {language.gfxStatus === 'generating' && <Loader2 className="w-3 h-3 inline mr-1 animate-spin" />}
                {language.gfxStatus === 'failed' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                GenAI GFX: {getStatusLabel(language.gfxStatus)}
              </span>
            )}
          </div>

          {/* Sub-stages */}
          <div className="flex items-center space-x-6">
            {language.subStages.map((stage, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                {getSubStageIcon(stage.status)}
                <span className="text-sm text-gray-700">{stage.name}</span>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {language.gfxStatus === 'failed' && language.errorMessage && (
            <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
              {language.errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
