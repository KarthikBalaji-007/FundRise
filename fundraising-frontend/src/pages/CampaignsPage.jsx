import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import CampaignGrid from '../components/campaign/CampaignGrid';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {
        page,
        limit: 12,
        sort: sortBy,
      };

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      const res = await axios.get('/campaigns', { params });

      setCampaigns(res.data.campaigns || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to load campaigns. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCampaigns();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Explore Campaigns
          </h1>
          <p className="text-gray-600">
            Discover and support campaigns that matter to you.
          </p>
        </div>

        {/* Search and Filters */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-lg shadow-md p-4 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4 items-center">
            {/* Search */}
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="medical">Medical</option>
              <option value="education">Education</option>
              <option value="emergency">Emergency</option>
              <option value="charity">Charity</option>
              <option value="creative">Creative</option>
            </select>

            {/* Sort + Apply */}
            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="trending">Sort by Trending</option>
                <option value="newest">Sort by Newest</option>
                <option value="ending-soon">Sort by Ending Soon</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-16 text-gray-600">Loading campaigns...</div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            No campaigns found yet. Check back later.
          </div>
        ) : (
          <>
            {/* Campaign Grid */}
            <CampaignGrid campaigns={campaigns} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10 space-x-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
