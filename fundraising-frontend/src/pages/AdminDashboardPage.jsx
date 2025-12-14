import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('campaigns');
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      if (activeTab === 'campaigns') {
        fetchPendingCampaigns();
      } else {
        fetchUsers();
      }
    }
  }, [user, activeTab]);

  const fetchPendingCampaigns = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/campaigns/admin/pending');
      // FIX: Ensure we always get an array
      const campaigns = res.data.data || res.data.campaigns || [];
      setPendingCampaigns(Array.isArray(campaigns) ? campaigns : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load pending campaigns');
      setPendingCampaigns([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/admin/users');
      // FIX: Ensure we always get an array
      const usersList = res.data.users || [];
      setUsers(Array.isArray(usersList) ? usersList : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
      setUsers([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`/campaigns/${id}/approve`);
      alert('Campaign approved successfully!');
      fetchPendingCampaigns();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve campaign');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason (optional):');
    try {
      await axios.put(`/campaigns/${id}/reject`, { reason });
      alert('Campaign rejected');
      fetchPendingCampaigns();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject campaign');
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You must be an admin to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'campaigns'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Campaigns
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Users
            </button>
          </nav>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Pending Campaigns</h2>

            {loading ? (
              <div className="text-center py-8 text-gray-600">Loading...</div>
            ) : pendingCampaigns.length === 0 ? (
              <div className="text-center py-8 text-gray-600">No pending campaigns</div>
            ) : (
              <div className="space-y-4">
                {pendingCampaigns.map(campaign => (
                  <div key={campaign._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{campaign.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {campaign.description?.substring(0, 150)}...
                        </p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span>Goal: ₹{campaign.goalAmount?.toLocaleString()}</span>
                          <span className="capitalize">Category: {campaign.category}</span>
                          <span>By: {campaign.creatorId?.name || 'Unknown'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleApprove(campaign._id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(campaign._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">All Users ({users.length})</h2>

            {loading ? (
              <div className="text-center py-8 text-gray-600">Loading...</div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-gray-600">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {users.map(user => (
                      <tr key={user._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{user.name}</td>
                        <td className="px-4 py-3 text-sm">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            user.role === 'creator' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
