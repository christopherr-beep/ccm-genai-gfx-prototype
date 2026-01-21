import React, { useState } from 'react';
import { GFXCard } from '../types';
import { X, CheckCircle, XCircle, Eye, RefreshCw, Loader2 } from 'lucide-react';
import { getStatusLabel, getStatusColor } from '../services/genAiService';
import { GFXPreviewModal } from './GFXPreviewModal';
import { DeliveryConfirmationModal } from './DeliveryConfirmationModal';

interface ReviewApprovalTableProps {
  gfxCards: GFXCard[];
  onClose: () => void;
  onUpdate: (cards: GFXCard[]) => void;
}

type TabType = 'review' | 'delivered';

export const ReviewApprovalTable: React.FC<ReviewApprovalTableProps> = ({
  gfxCards: initialCards,
  onClose,
  onUpdate,
}) => {
  const [cards, setCards] = useState<GFXCard[]>(initialCards);
  const [selectedCard, setSelectedCard] = useState<GFXCard | null>(null);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [selectedCardIds, setSelectedCardIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<TabType>('review');

  const handleApprove = (cardId: string) => {
    const updatedCards = cards.map(card =>
      card.id === cardId ? { ...card, status: 'approved' as const } : card
    );
    setCards(updatedCards);
    onUpdate(updatedCards);
  };

  const handleReject = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      setSelectedCard(card);
    }
  };

  const handleCardUpdate = (updatedCard: GFXCard) => {
    const updatedCards = cards.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    );
    setCards(updatedCards);
    onUpdate(updatedCards);
  };

  const updateCardInList = (cardId: string, updates: Partial<GFXCard>) => {
    const updatedCards = cards.map(card =>
      card.id === cardId ? { ...card, ...updates } : card
    );
    setCards(updatedCards);
    onUpdate(updatedCards);
  };

  const handleToggleSelect = (cardId: string, isApproved: boolean) => {
    if (!isApproved) return;
    
    setSelectedCardIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleDeliverToVanDAM = () => {
    setShowDeliveryModal(true);
  };

  const handleDeliveryConfirm = () => {
    setShowDeliveryModal(false);
    
    // Determine which cards to deliver
    const cardsToDeliver = selectedCardIds.size > 0
      ? cards.filter(card => selectedCardIds.has(card.id))
      : cards.filter(card => card.status === 'approved');
    
    // Update status to "delivered" for all delivered cards
    const updatedCards = cards.map(card =>
      cardsToDeliver.some(c => c.id === card.id)
        ? { ...card, status: 'delivered' as const }
        : card
    );
    
    setCards(updatedCards);
    onUpdate(updatedCards);
    
    // Clear selections and switch to delivered tab
    setSelectedCardIds(new Set());
    setActiveTab('delivered');
    
    const count = cardsToDeliver.length;
    alert(`${count} GFX card(s) delivered to VanDAM successfully!`);
  };

  // Filter cards by tab
  const reviewCards = cards.filter(c => c.status !== 'delivered');
  const deliveredCards = cards.filter(c => c.status === 'delivered');
  
  // Get cards for current tab
  const displayedCards = activeTab === 'review' ? reviewCards : deliveredCards;
  
  const approvedCount = reviewCards.filter(c => c.status === 'approved').length;
  const allApproved = reviewCards.length > 0 && approvedCount === reviewCards.length;
  const hasSelectedApproved = selectedCardIds.size > 0;
  const canDeliver = hasSelectedApproved || allApproved;

  return (
    <>
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Review & Approve GFX Cards</h2>
              <p className="text-sm text-gray-600 mt-1">
                {activeTab === 'review' ? (
                  <>
                    {approvedCount} of {reviewCards.length} approved
                    {selectedCardIds.size > 0 && ` • ${selectedCardIds.size} selected`}
                  </>
                ) : (
                  <>{deliveredCards.length} card(s) delivered</>
                )}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="px-6">
            <div className="flex space-x-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('review')}
                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'review'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Review & Approve
                {reviewCards.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {reviewCards.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('delivered')}
                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'delivered'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Delivered to VanDAM
                {deliveredCards.length > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {deliveredCards.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          {displayedCards.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 text-center">
                {activeTab === 'review' ? 'No cards to review' : 'No cards have been delivered yet'}
              </p>
            </div>
          ) : (
            <table className="w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                <tr>
                  {activeTab === 'review' && (
                    <th className="px-4 py-3 w-12">
                      {/* Checkbox column */}
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  {activeTab === 'review' && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedCards.map(card => {
                  const isApproved = card.status === 'approved';
                  const isSelected = selectedCardIds.has(card.id);
                  const isRegenerating = card.status === 'generating';
                  const isDelivered = card.status === 'delivered';
                  
                  return (
                    <tr key={card.id} className="hover:bg-gray-50">
                      {activeTab === 'review' && (
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={!isApproved}
                            onChange={() => handleToggleSelect(card.id, isApproved)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                          />
                        </td>
                      )}
                      <td className="px-4 py-4">
                        <button
                          onClick={() => activeTab === 'review' && setSelectedCard(card)}
                          className="relative group"
                          disabled={isRegenerating || activeTab === 'delivered'}
                        >
                          <video
                            src={card.imageUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-32 h-57 object-cover rounded border border-gray-200 group-hover:border-blue-500 transition-colors"
                            style={{ aspectRatio: '9/16', opacity: isRegenerating || activeTab === 'delivered' ? 0.5 : 1 }}
                          />
                          {isRegenerating && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded">
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>
                          )}
                          {!isRegenerating && activeTab === 'review' && (
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 flex items-center justify-center rounded transition-all">
                              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">{card.languageName}</div>
                        <div className="text-sm text-gray-500">{card.languageCode}</div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                          {getStatusLabel(card.status)}
                        </span>
                      </td>
                      {activeTab === 'review' && (
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {card.status !== 'rejected' && card.status !== 'generating' && card.status !== 'delivered' && (
                              <button
                                onClick={() => handleReject(card.id)}
                                className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-gray-50 text-black rounded text-sm font-medium transition-colors border border-black border-opacity-50"
                              >
                                <RefreshCw className="w-4 h-4" />
                                <span>Edit & Regenerate</span>
                              </button>
                            )}
                            {card.status !== 'approved' && card.status !== 'generating' && card.status !== 'delivered' && (
                              <button
                                onClick={() => handleApprove(card.id)}
                                className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-gray-50 text-black rounded text-sm font-medium transition-colors border border-black border-opacity-50"
                              >
                                <CheckCircle className="w-4 h-4" />
                                <span>Approve</span>
                              </button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                );
              })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {activeTab === 'review' 
                ? 'Click on any thumbnail to preview in full screen'
                : 'These cards have been successfully delivered to VanDAM'
              }
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                Close
              </button>
              {activeTab === 'review' && (
                <button
                  onClick={handleDeliverToVanDAM}
                  disabled={!canDeliver}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  Deliver to VanDAM
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedCard && (
        <GFXPreviewModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdate={handleCardUpdate}
          onStartRegeneration={(cardId) => {
            updateCardInList(cardId, { status: 'generating' });
            setSelectedCard(null);
          }}
        />
      )}

      {/* Delivery Confirmation Modal */}
      {showDeliveryModal && (
        <DeliveryConfirmationModal
          approvedCount={selectedCardIds.size > 0 ? selectedCardIds.size : approvedCount}
          onConfirm={handleDeliveryConfirm}
          onCancel={() => setShowDeliveryModal(false)}
        />
      )}
    </>
  );
};
