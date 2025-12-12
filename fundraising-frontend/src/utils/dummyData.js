export const dummyCampaigns = [
  {
    id: '1',
    slug: 'help-cancer-treatment',
    title: 'Help Fight Cancer Treatment',
    description: 'Support my battle against cancer. Every contribution helps me get closer to recovery.',
    category: 'medical',
    goalAmount: 500000,
    currentAmount: 125000,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
    deadline: '2026-03-31',
    status: 'active',
    isVerified: true,
    viewCount: 245,
    donorCount: 12,
    daysLeft: 115,
    creator: {
      name: 'John Doe',
      image: 'https://ui-avatars.com/api/?name=John+Doe&background=0ea5e9&color=fff'
    }
  },
  {
    id: '2',
    slug: 'education-for-rural-kids',
    title: 'Education for Rural Kids',
    description: 'Help us build a school in rural areas to provide quality education.',
    category: 'education',
    goalAmount: 1000000,
    currentAmount: 450000,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
    deadline: '2026-06-30',
    status: 'active',
    isVerified: true,
    viewCount: 890,
    donorCount: 45,
    daysLeft: 205,
    creator: {
      name: 'Sarah Johnson',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0ea5e9&color=fff'
    }
  },
  {
    id: '3',
    slug: 'emergency-flood-relief',
    title: 'Emergency Flood Relief',
    description: 'Immediate support needed for flood-affected families.',
    category: 'emergency',
    goalAmount: 300000,
    currentAmount: 180000,
    currency: 'INR',
    image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800',
    deadline: '2026-01-31',
    status: 'active',
    isVerified: true,
    viewCount: 456,
    donorCount: 28,
    daysLeft: 54,
    creator: {
      name: 'Mike Wilson',
      image: 'https://ui-avatars.com/api/?name=Mike+Wilson&background=0ea5e9&color=fff'
    }
  }
];

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculatePercentage = (current, goal) => {
  return Math.min(Math.round((current / goal) * 100), 100);
};
