// src/pages/Dashboard.jsx
import { useState } from 'react';
import NewsletterForm from '../components/NewsletterForm';
import NewsletterList from '../components/NewsletterList';

const Dashboard = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📬 SocialScribe Dashboard</h1>
      <NewsletterForm onCreated={() => setRefresh(r => r + 1)} />
      <NewsletterList refreshTrigger={refresh} />
    </div>
  );
};

export default Dashboard;