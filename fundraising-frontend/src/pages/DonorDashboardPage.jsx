import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DonorDashboardPage = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/donations/my-donations');
        setDonations(res.data.data.donations || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load donations.');
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Donations</h1>

        {error && <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Total Donations</h3>
            <p className="text-3xl font-bold text-blue-600">{donations.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Total Amount Donated</h3>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Donation History</h2>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading...</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No donations yet. <Link to="/campaigns" className="text-blue-600 hover:underline">Explore campaigns</Link>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Campaign</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {donations.map((d) => (
                  <tr key={d._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      {d.campaignId ? (
                        <Link to={`/campaigns/${d.campaignId.slug}`} className="text-blue-600 hover:underline">
                          {d.campaignId.title}
                        </Link>
                      ) : (
                        <span className="text-gray-500">Removed</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{formatCurrency(d.amount)}</td>
                    <td className="px-4 py-3 text-sm">
                      {new Date(d.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-sm capitalize">{d.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboardPage;
