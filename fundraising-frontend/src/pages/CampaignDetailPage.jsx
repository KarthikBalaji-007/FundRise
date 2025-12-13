import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaUsers, FaShare, FaHeart } from 'react-icons/fa';
import axios from '../utils/axios';
import Button from '../components/common/Button';
import DonationModal from '../components/campaign/DonationModal';

const CampaignDetailPage = () => {
  const { slug } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  // Fetch campaign from API
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get(`/campaigns/${slug}`);
        setCampaign(res.data.campaign);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to load campaign details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [slug]);

  // Handle successful donation - update campaign stats locally
  const handleDonationSuccess = (donation) => {
    setCampaign((prev) => {
      if (!prev) return prev;
      const newAmount = prev.currentAmount + donation.amount;
      const newPercentage = Math.min(
        Math.round((newAmount / prev.goalAmount) * 100),
        100
      );
      return {
        ...prev,
        currentAmount: newAmount,
        donorCount: prev.donorCount + 1,
        fundingPercentage: newPercentage,
      };
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">Loading campaign...</div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Campaign Not Found
          </h2>
          <p className="text-gray-600 mb-4">{error || 'This campaign does not exist.'}</p>
          <Link to="/campaigns">
            <Button variant="primary">Browse Campaigns</Button>
          </Link>
        </div>
      </div>
    );
  }

  const percentage = campaign.fundingPercentage || 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2">
            {/* Campaign Image */}
            <div className="relative h-96 rounded-xl overflow-hidden mb-6 bg-gray-200">
              {campaign.images && campaign.images.length > 0 ? (
                <img
                  src={campaign.images[0]}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
              {campaign.isVerified && (
                <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" size={20} />
                  <span className="font-semibold text-sm">Verified Campaign</span>
                </div>
              )}
            </div>

            {/* Category & Title */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
                ${campaign.category === 'medical' ? 'bg-red-100 text-red-700' : ''}
                ${campaign.category === 'education' ? 'bg-blue-100 text-blue-700' : ''}
                ${campaign.category === 'emergency' ? 'bg-orange-100 text-orange-700' : ''}
                ${campaign.category === 'charity' ? 'bg-green-100 text-green-700' : ''}
                ${campaign.category === 'creative' ? 'bg-purple-100 text-purple-700' : ''}
              `}
              >
                {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
              </span>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">{campaign.title}</h1>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {campaign.creatorId?.name?.charAt(0) || 'U'}
                  </div>
                  <span>
                    by <span className="font-semibold">{campaign.creatorId?.name || 'Creator'}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaUsers />
                  <span>{campaign.donorCount} donors</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-md">
              {/* Tab Headers */}
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 border-b-2 font-semibold transition ${
                      activeTab === 'overview'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('updates')}
                    className={`py-4 border-b-2 font-semibold transition ${
                      activeTab === 'updates'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Updates
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Campaign Story</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {campaign.description}
                    </p>
                  </div>
                )}

                {activeTab === 'updates' && (
                  <div className="text-center py-8 text-gray-600">
                    No updates yet. Check back later!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Funding Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              {/* Amount */}
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  {formatCurrency(campaign.currentAmount)}
                </h2>
                <p className="text-gray-600">
                  raised of {formatCurrency(campaign.goalAmount)} goal
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">{percentage}% funded</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <FaUsers />
                  <span>{campaign.donorCount} donors</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaClock />
                  <span>{campaign.daysLeft} days left</span>
                </div>
              </div>

              {/* Donate Button */}
              <Button
                variant="primary"
                className="w-full mb-3"
                size="lg"
                onClick={() => setIsDonationModalOpen(true)}
              >
                Donate Now
              </Button>

              {/* Share & Bookmark */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center justify-center space-x-2">
                  <FaShare />
                  <span>Share</span>
                </Button>
                <Button variant="secondary" className="flex items-center justify-center space-x-2">
                  <FaHeart />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        campaignId={campaign._id}
        onSuccess={handleDonationSuccess}
      />
    </div>
  );
};

export default CampaignDetailPage;
