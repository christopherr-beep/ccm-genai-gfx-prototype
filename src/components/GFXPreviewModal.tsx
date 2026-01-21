import React, { useState } from 'react';
import { GFXCard } from '../types';
import { X, RefreshCw, CheckCircle } from 'lucide-react';
import { regenerateGFXCard } from '../services/genAiService';

interface GFXPreviewModalProps {
  card: GFXCard;
  onClose: () => void;
  onUpdate: (card: GFXCard) => void;
  onStartRegeneration: (cardId: string) => void;
}

export const GFXPreviewModal: React.FC<GFXPreviewModalProps> = ({
  card: initialCard,
  onClose,
  onUpdate,
  onStartRegeneration,
}) => {
  const [card, setCard] = useState<GFXCard>(initialCard);
  const [prompt, setPrompt] = useState(card.prompt);

  const handleRegenerate = async () => {
    if (prompt.trim() === card.prompt) {
      alert('Please modify the prompt before regenerating.');
      return;
    }

    // Notify parent that regeneration is starting and close modal
    onStartRegeneration(card.id);
    
    // Start background regeneration
    try {
      const updatedCard = await regenerateGFXCard(card, prompt);
      onUpdate(updatedCard);
    } catch (error) {
      onUpdate({ ...card, status: 'failed', errorMessage: 'Failed to regenerate GFX card. Please try again.' });
    }
  };

  const handleApprove = () => {
    const approvedCard = { ...card, status: 'approved' as const };
    onUpdate(approvedCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full mx-4 max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{card.languageName}</h2>
            <p className="text-sm text-gray-600">{card.languageCode}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Video Preview */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">GFX Card Preview</h3>
              <div className="relative">
                <video
                  src={card.imageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full rounded-lg border border-gray-300 shadow-lg"
                  style={{ aspectRatio: '9/16' }}
                />
              </div>
            </div>

            {/* Prompt Editor */}
            <div className="flex flex-col">
              <h3 className="font-medium text-gray-900 mb-3">Prompt</h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                placeholder="Enter prompt for GenAI..."
                rows={12}
              />
              
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-900">
                  💡 <strong>Tip:</strong> Modify the prompt above and click "Regenerate" to create a new version of this GFX card based on your changes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Close
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRegenerate}
              disabled={prompt.trim() === card.prompt}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </button>
            <button
              onClick={handleApprove}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Approve</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
