import React, { useState } from 'react';
import { Campaign, Language, GFXCard } from '../types';
import { LanguageRow } from './LanguageRow';
import { GenerateGFXModal } from './GenerateGFXModal';
import { ReviewApprovalTable } from './ReviewApprovalTable';
import { Sparkles } from 'lucide-react';

interface PizzaTrackerProps {
  campaign: Campaign;
}

export const PizzaTracker: React.FC<PizzaTrackerProps> = ({ campaign: initialCampaign }) => {
  const [campaign, setCampaign] = useState<Campaign>(initialCampaign);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showReviewTable, setShowReviewTable] = useState(false);
  const [gfxCards, setGfxCards] = useState<GFXCard[]>([]);

  const updateLanguageStatus = (languageCode: string, updates: Partial<Language>) => {
    setCampaign(prev => ({
      ...prev,
      languages: prev.languages.map(lang =>
        lang.code === languageCode ? { ...lang, ...updates } : lang
      ),
    }));
  };

  const handleGenerateClick = () => {
    setShowGenerateModal(true);
  };

  const handleGenerateConfirm = (selectedLanguages: string[]) => {
    setShowGenerateModal(false);
    // Start generation process for selected languages
    selectedLanguages.forEach(langCode => {
      updateLanguageStatus(langCode, { gfxStatus: 'queued' });
    });
  };

  const handleOpenReview = () => {
    // Create GFX cards array from languages with needs_review/approved/rejected/delivered status
    const cards: GFXCard[] = campaign.languages
      .filter(lang => lang.gfxStatus === 'needs_review' || lang.gfxStatus === 'approved' || lang.gfxStatus === 'rejected' || lang.gfxStatus === 'generating' || lang.gfxStatus === 'delivered')
      .map(lang => ({
        id: `gfx-${lang.code}`,
        languageCode: lang.code,
        languageName: lang.name,
        status: lang.gfxStatus,
        imageUrl: lang.gfxCardUrl || '',
        prompt: lang.gfxPrompt || '',
      }));
    
    setGfxCards(cards);
    setShowReviewTable(true);
  };

  const hasEligibleLanguages = campaign.languages.length > 0;
  const hasCompletedCards = campaign.languages.some(
    lang => lang.gfxStatus === 'needs_review' || lang.gfxStatus === 'approved' || lang.gfxStatus === 'generating' || lang.gfxStatus === 'delivered'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">N</div>
            <div>
              <div className="text-xs text-gray-500">CCM</div>
              <h1 className="text-xl font-semibold text-gray-900">{campaign.name}</h1>
            </div>
          </div>
          <div className="text-sm text-gray-600">Campaign ID: {campaign.id}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Action Bar */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleGenerateClick}
                disabled={!hasEligibleLanguages}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate GenAI GFX Cards</span>
              </button>
              
              {hasCompletedCards && (
                <button
                  onClick={handleOpenReview}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <span>Review & Approve GFX Cards</span>
                </button>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              {campaign.languages.length} language(s)
            </div>
          </div>
        </div>

        {/* Localization Info */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Localization Info</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Go to spot translations
            </button>
          </div>

          {/* Language Rows */}
          <div className="divide-y divide-gray-200">
            {campaign.languages.map((language) => (
              <LanguageRow
                key={language.code}
                language={language}
                onStatusUpdate={(updates) => updateLanguageStatus(language.code, updates)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showGenerateModal && (
        <GenerateGFXModal
          languages={campaign.languages}
          onConfirm={handleGenerateConfirm}
          onCancel={() => setShowGenerateModal(false)}
        />
      )}

      {showReviewTable && (
        <ReviewApprovalTable
          gfxCards={gfxCards}
          onClose={() => setShowReviewTable(false)}
          onUpdate={(updatedCards) => {
            // Update campaign languages with new statuses
            updatedCards.forEach(card => {
              updateLanguageStatus(card.languageCode, {
                gfxStatus: card.status,
                gfxCardUrl: card.imageUrl,
                gfxPrompt: card.prompt,
              });
            });
            setGfxCards(updatedCards);
          }}
        />
      )}
    </div>
  );
};
