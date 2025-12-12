import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import CampaignGrid from '../components/campaign/CampaignGrid';
import { dummyCampaigns } from '../utils/dummyData';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-sky-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Fund Hope. Change Lives.
              </h1>
              <p className="text-xl mb-6 text-sky-100">
                Join thousands of people making a real difference through transparent and trustworthy fundraising.
              </p>
              <div className="flex space-x-4">
                <Link to="/campaigns/create">
                  <Button variant="accent" size="lg">Start a Campaign</Button>
                </Link>
                <Link to="/campaigns">
                  <Button variant="outline" size="lg" className="bg-white text-primary border-white hover:bg-sky-50">
                    Browse Campaigns
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side - Stats Card */}
            <div className="bg-white text-gray-900 rounded-xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Platform Impact</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Raised</span>
                  <span className="text-2xl font-bold text-primary">₹50L+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Campaigns</span>
                  <span className="text-2xl font-bold text-accent">150+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Donors</span>
                  <span className="text-2xl font-bold text-green-500">5,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Featured Campaigns
            </h2>
            <p className="text-gray-600 text-lg">
              Support causes that matter to you
            </p>
          </div>

          <CampaignGrid campaigns={dummyCampaigns} />

          <div className="text-center mt-10">
            <Link to="/campaigns">
              <Button variant="primary" size="lg">View All Campaigns</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white" id="how-it-works">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Three simple steps to make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Create a Campaign</h3>
              <p className="text-gray-600">
                Share your story and set your fundraising goal. It's free and takes just a few minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Share with Others</h3>
              <p className="text-gray-600">
                Spread the word through social media, email, and messaging to reach potential donors.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Receive Support</h3>
              <p className="text-gray-600">
                Accept donations and keep your supporters updated with campaign progress.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
