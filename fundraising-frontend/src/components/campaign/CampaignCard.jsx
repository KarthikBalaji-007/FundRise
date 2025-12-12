import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';
import { formatCurrency, calculatePercentage } from '../../utils/dummyData';

const CampaignCard = ({ campaign }) => {
  const percentage = calculatePercentage(campaign.currentAmount, campaign.goalAmount);

  const categoryColors = {
    medical: 'bg-red-100 text-red-700',
    education: 'bg-blue-100 text-blue-700',
    emergency: 'bg-orange-100 text-orange-700',
    charity: 'bg-green-100 text-green-700',
    creative: 'bg-purple-100 text-purple-700'
  };

  return (
    <Link to={`/campaigns/${campaign.slug}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group h-full flex flex-col">

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {campaign.isVerified && (
            <div className="absolute top-3 right-3 bg-white rounded-full p-1.5">
              <FaCheckCircle className="text-green-500" size={18} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">

          {/* Category */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[campaign.category]}`}>
            {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition">
            {campaign.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {campaign.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-900">
                {formatCurrency(campaign.currentAmount)}
              </span>
              <span className="text-gray-600">
                of {formatCurrency(campaign.goalAmount)}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t">
            <div className="flex items-center space-x-1">
              <FaUsers size={14} />
              <span>{campaign.donorCount} donors</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock size={14} />
              <span>{campaign.daysLeft} days left</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
