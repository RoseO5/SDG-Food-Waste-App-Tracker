'use client';

import { useState } from 'react';

export default function WasteTracker() {
  const [foodType, setFoodType] = useState('');
  const [quantityKg, setQuantityKg] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch('/api/waste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodType, quantityKg, reason }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: '✅ Waste logged! Thank you for supporting SDG 12!' });
        setFoodType('');
        setQuantityKg('');
        setReason('');
      } else {
        setMessage({ type: 'error', text: `❌ ${result.error}` });
      }
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-6">
        <div className="bg-green-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">🌍 Food Waste Tracker</h1>
          <p className="text-green-100 mt-1">Supporting UN SDG 12</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food Type *
              </label>
              <input
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g., Rice, Bread, Vegetables"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity (kg) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={quantityKg}
                onChange={(e) => setQuantityKg(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="e.g., 1.5"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason (Optional)
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Why was it wasted? (e.g., Overcooked, Expired)"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${
                isSubmitting
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              } transition-colors`}
            >
              {isSubmitting ? 'Saving...' : 'Log Waste 💚'}
            </button>
          </form>

          {message && (
            <div
              className={`mt-5 p-4 rounded-lg text-center ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t">
          Every log helps reduce global food waste 🌍
        </div>
      </div>
    </main>
  );
}
