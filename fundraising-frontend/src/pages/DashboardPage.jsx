import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/campaigns/my-campaigns'); // FIXED: removed extra slash
        setCampaigns(res.data.campaigns || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your campaigns');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'creator') {
      fetchMyCampaigns();
    } else {
      setLoading(false);
    }
  }, [user]);

  // FIXED: handleDelete moved OUTSIDE useEffect
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/campaigns/${id}`);
      // Remove from local state
      setCampaigns((prev) => prev.filter((c) => c._id !== id));
      alert('Campaign deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.response?.data?.message || 'Failed to delete campaign');
    }
  };

  // Calculate stats
  const totalRaised = campaigns.reduce((sum, c) => sum + c.currentAmount, 0);
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donorCount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {user?.role === 'creator' ? 'Creator Dashboard' : 'Dashboard'}
        </h1>

        {user?.role === 'creator' ? (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 text-sm mb-2">Total Raised</h3>
                <p className="text-3xl font-bold text-blue-600">
                  ₹{totalRaised.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 text-sm mb-2">Active Campaigns</h3>
                <p className="text-3xl font-bold text-orange-600">{activeCampaigns}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 text-sm mb-2">Total Donors</h3>
                <p className="text-3xl font-bold text-green-600">{totalDonors}</p>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Campaigns Table */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Campaigns</h2>
                <Link
                  to="/campaigns/create"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Campaign
                </Link>
              </div>

              {loading ? (
                <div className="text-center py-8 text-gray-600">Loading...</div>
              ) : campaigns.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  You haven't created any campaigns yet.
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
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Raised
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Progress
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Days Left
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {campaigns.map((campaign) => (
                        <tr key={campaign._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">{campaign.title}</td>
                          <td className="px-4 py-3 text-sm capitalize">
                            {campaign.category}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                                campaign.status
                              )}`}
                            >
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            ₹{campaign.currentAmount.toLocaleString()} / ₹
                            {campaign.goalAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {campaign.fundingPercentage}%
                          </td>
                          <td className="px-4 py-3 text-sm">{campaign.daysLeft} days</td>
                          <td className="px-4 py-3 text-sm space-x-2">
                            <Link
                              to={`/campaigns/edit/${campaign._id}`}
                              className="inline-block px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(campaign._id)}
                              className="px-3 py-1.5 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">
              {user?.role === 'donor'
                ? 'Donor dashboard coming soon.'
                : 'Welcome to your dashboard.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
