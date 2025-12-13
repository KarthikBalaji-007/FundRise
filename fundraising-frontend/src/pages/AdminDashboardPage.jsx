import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState('');

  // Redirect guard in case someone reaches here without admin role
  if (user && user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">
            Only admin users can access the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  const fetchPending = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/campaigns/admin/pending');
      setPendingCampaigns(res.data.data.campaigns || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to load pending campaigns.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      setActionLoadingId(id);
      setError('');
      await axios.put(`/campaigns/${id}/approve`);
      // Remove from local list
      setPendingCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to approve campaign.'
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt(
      'Optional: Enter rejection reason',
      'Campaign did not meet platform guidelines'
    );
    try {
      setActionLoadingId(id);
      setError('');
      await axios.put(`/campaigns/${id}/reject`, { reason });
      setPendingCampaigns((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to reject campaign.'
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm text-gray-500 mb-2">Pending Campaigns</h3>
            <p className="text-3xl font-bold text-orange-600">
              {pendingCampaigns.length}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Pending Campaign Approvals</h2>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading...</div>
          ) : pendingCampaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No pending campaigns at the moment.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Creator
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Goal
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {pendingCampaigns.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        {c.title}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {c.creatorId?.name} <br />
                        <span className="text-xs text-gray-500">
                          {c.creatorId?.email}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm capitalize">
                        {c.category}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        ₹{c.goalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="px-4 py-3 text-sm space-x-2">
                        <button
                          onClick={() => handleApprove(c._id)}
                          disabled={actionLoadingId === c._id}
                          className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          {actionLoadingId === c._id ? 'Processing...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleReject(c._id)}
                          disabled={actionLoadingId === c._id}
                          className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
