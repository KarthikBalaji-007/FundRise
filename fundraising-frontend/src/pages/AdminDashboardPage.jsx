import React, { useState } from 'react';
import Button from '../components/common/Button';
import { FaCheckCircle, FaTimesCircle, FaUsers, FaClock } from 'react-icons/fa';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Dummy pending campaigns
  const pendingCampaigns = [
    {
      id: '1',
      title: 'Help Fund My Education',
      creator: 'Alice Johnson',
      category: 'education',
      goalAmount: 200000,
      createdAt: '2 hours ago',
      verificationDocs: true
    },
    {
      id: '2',
      title: 'Emergency Medical Treatment',
      creator: 'Bob Smith',
      category: 'medical',
      goalAmount: 500000,
      createdAt: '5 hours ago',
      verificationDocs: true
    }
  ];

  const handleApprove = (campaignId) => {
    alert(`Campaign ${campaignId} approved!`);
  };

  const handleReject = (campaignId) => {
    const reason = prompt('Reason for rejection:');
    if (reason) {
      alert(`Campaign ${campaignId} rejected. Reason: ${reason}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage campaigns, users, and platform settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaUsers className="text-blue-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Campaigns</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-green-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Approval</p>
                <p className="text-3xl font-bold text-orange-500">8</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FaClock className="text-orange-500" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Raised</p>
                <p className="text-3xl font-bold text-primary">₹50L+</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">₹</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          {/* Tab Headers */}
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'pending'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Pending Campaigns ({pendingCampaigns.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'users'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                User Management
              </button>
              <button
                onClick={() => setActiveTab('withdrawals')}
                className={`py-4 border-b-2 font-semibold transition ${
                  activeTab === 'withdrawals'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Withdrawals
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">

            {/* Pending Campaigns Tab */}
            {activeTab === 'pending' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Campaigns Awaiting Approval</h3>

                {pendingCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{campaign.title}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-semibold
                            ${campaign.category === 'medical' ? 'bg-red-100 text-red-700' : ''}
                            ${campaign.category === 'education' ? 'bg-blue-100 text-blue-700' : ''}
                          `}>
                            {campaign.category}
                          </span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                          <span>Creator: <strong>{campaign.creator}</strong></span>
                          <span>Goal: <strong>₹{campaign.goalAmount.toLocaleString()}</strong></span>
                          <span>Submitted: {campaign.createdAt}</span>
                        </div>

                        {campaign.verificationDocs && (
                          <div className="flex items-center space-x-2 text-sm text-green-600">
                            <FaCheckCircle />
                            <span>Verification documents attached</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-3 ml-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => alert('View campaign details (not implemented in skeleton)')}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(campaign.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => handleReject(campaign.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <h3 className="text-xl font-bold mb-4">User Management</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-3 text-sm">John Doe</td>
                        <td className="px-4 py-3 text-sm">john@example.com</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">Creator</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">Dec 1, 2025</td>
                        <td className="px-4 py-3">
                          <button className="text-primary text-sm hover:underline">View</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm">Jane Smith</td>
                        <td className="px-4 py-3 text-sm">jane@example.com</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Donor</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">Nov 28, 2025</td>
                        <td className="px-4 py-3">
                          <button className="text-primary text-sm hover:underline">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Withdrawals Tab */}
            {activeTab === 'withdrawals' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Withdrawal Requests</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg mb-2">Help Fight Cancer Treatment</h4>
                        <p className="text-sm text-gray-600 mb-2">Creator: John Doe</p>
                        <p className="text-sm">Requested Amount: <strong>₹1,25,000</strong></p>
                        <p className="text-sm text-gray-600">Available: ₹1,25,000</p>
                      </div>
                      <div className="flex space-x-3">
                        <Button variant="primary" size="sm">Approve</Button>
                        <Button variant="outline" size="sm" className="border-red-500 text-red-500">Reject</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
