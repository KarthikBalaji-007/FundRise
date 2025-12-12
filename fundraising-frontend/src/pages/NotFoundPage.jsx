import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <Link to="/">
            <Button variant="primary" size="lg">
              Go to Home
            </Button>
          </Link>
          <Link to="/campaigns">
            <Button variant="secondary" size="lg">
              Browse Campaigns
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
