import React from 'react';
import { AlertTriangle, Package } from 'lucide-react';

interface DeliveryConfirmationModalProps {
  approvedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeliveryConfirmationModal: React.FC<DeliveryConfirmationModalProps> = ({
  approvedCount,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-full">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Deliver to VanDAM</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-900">
              <p className="font-medium mb-1">Confirm Delivery</p>
              <p>
                This action will deliver <strong>{approvedCount} approved GFX card(s)</strong> to VanDAM for distribution.
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>Before proceeding, please ensure:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>All cards have been reviewed and approved</li>
              <li>Content meets quality and compliance standards</li>
              <li>Language-specific requirements are satisfied</li>
            </ul>
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
            onClick={onConfirm}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Confirm Delivery
          </button>
        </div>
      </div>
    </div>
  );
};
