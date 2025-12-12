import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaUsers, FaShare, FaHeart } from 'react-icons/fa';
import Button from '../components/common/Button';
import { dummyCampaigns, formatCurrency, calculatePercentage } from '../utils/dummyData';
import DonationModal from '../components/campaign/DonationModal';

const CampaignDetailPage = () => {
  const { slug } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  // Find campaign by slug (in real app, this would be an API call)
  const campaign = dummyCampaigns.find(c => c.slug === slug) || dummyCampaigns[0];
  const percentage = calculatePercentage(campaign.currentAmount, campaign.goalAmount);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2">

            {/* Campaign Image */}
            <div className="relative h-96 rounded-xl overflow-hidden mb-6">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              {campaign.isVerified && (
                <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" size={20} />
                  <span className="font-semibold text-sm">Verified Campaign</span>
                </div>
              )}
            </div>

            {/* Category & Title */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
                ${campaign.category === 'medical' ? 'bg-red-100 text-red-700' : ''}
                ${campaign.category === 'education' ? 'bg-blue-100 text-blue-700' : ''}
                ${campaign.category === 'emergency' ? 'bg-orange-100 text-orange-700' : ''}
              `}>
                {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
              </span>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">{campaign.title}</h1>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <img
                    src={campaign.creator.image}
                    alt={campaign.creator.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>by <span className="font-semibold">{campaign.creator.name}</span></span>
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
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('updates')}
                    className={`py-4 border-b-2 font-semibold transition ${
                      activeTab === 'updates'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Updates (2)
                  </button>
                  <button
                    onClick={() => setActiveTab('comments')}
                    className={`py-4 border-b-2 font-semibold transition ${
                      activeTab === 'comments'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Comments (5)
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold mb-4">Campaign Story</h3>
                    <p className="text-gray-700 leading-relaxed">{campaign.description}</p>
                    <p className="text-gray-700 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Your support will help us achieve
                      this important goal and make a real difference.
                    </p>
                  </div>
                )}

                {activeTab === 'updates' && (
                  <div className="space-y-6">
                    {/* Update 1 */}
                    <div className="border-b pb-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold">Treatment Progress Update</h4>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-700">
                        Thank you all for your amazing support! We've completed the first round of
                        treatment successfully. The doctors are optimistic about the results.
                      </p>
                    </div>

                    {/* Update 2 */}
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold">Reached 25% of Goal!</h4>
                        <span className="text-sm text-gray-500">5 days ago</span>
                      </div>
                      <p className="text-gray-700">
                        We're thrilled to have reached 25% of our fundraising goal. Every contribution
                        brings us closer to our target. Thank you!
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'comments' && (
                  <div className="space-y-6">
                    {/* Comment 1 */}
                    <div className="flex space-x-3">
                      <img
                        src="https://ui-avatars.com/api/?name=Jane+Smith&background=0ea5e9&color=fff"
                        alt="Jane Smith"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold">Jane Smith</span>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Stay strong! Sending prayers and positive thoughts your way. 🙏
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Comment 2 */}
                    <div className="flex space-x-3">
                      <img
                        src="https://ui-avatars.com/api/?name=Robert+Brown&background=0ea5e9&color=fff"
                        alt="Robert Brown"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold">Robert Brown</span>
                            <span className="text-xs text-gray-500">3 days ago</span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            Just donated! Hope this helps. Wishing you a speedy recovery!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Add Comment */}
                    <div className="pt-4 border-t">
                      <textarea
                        placeholder="Write a comment..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        rows="3"
                      />
                      <div className="mt-3">
                        <Button variant="primary" size="sm">Post Comment</Button>
                      </div>
                    </div>
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
                    className="bg-primary h-3 rounded-full transition-all"
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
                      {/* Donation Modal */}
                <DonationModal
                isOpen={isDonationModalOpen}
                onClose={() => setIsDonationModalOpen(false)}
                campaign={campaign}
                />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
};

export default CampaignDetailPage;
