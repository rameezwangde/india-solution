import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
        <p className="text-gray-400">Module coming next.</p>
      </div>
    </div>
  );
};

export const AdminProductsPage = () => <PlaceholderPage title="Manage Products" />;
export const AdminCategoriesPage = () => <PlaceholderPage title="Manage Categories" />;
export const AdminEnquiriesPage = () => <PlaceholderPage title="Manage Enquiries" />;
