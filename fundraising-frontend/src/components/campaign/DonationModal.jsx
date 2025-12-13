import React, { useState } from 'react';
import axios from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';

const DonationModal = ({ isOpen, onClose, campaignId, onSuccess }) => {
  const { isAuthenticated } = useAuth();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isAuthenticated) {
      setError('Please login as a donor to make a donation.');
      return;
    }

    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 1) {
      setError('Please enter a valid donation amount (min ₹1).');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/donations', {
        campaignId,
        amount: numericAmount,
        message,
        isAnonymous,
        paymentMethod: 'simulated',
      });

      if (onSuccess) {
        onSuccess(res.data.data.donation);
      }

      setAmount('');
      setMessage('');
      setIsAnonymous(false);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to process donation. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Donate to this campaign</h2>

        {error && (
          <div className="mb-3 bg-red-50 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (INR)
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount e.g. 500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Send a note of support to the creator"
            />
          </div>

          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Donate anonymously
            </span>
          </label>

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Donate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonationModal;
