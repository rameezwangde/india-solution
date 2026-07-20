import React from 'react';
import { Info, HelpCircle, Package, Database, Download, LifeBuoy } from 'lucide-react';

const HelpSection = ({ title, icon: Icon, children }) => (
  <div className="bg-white border border-[#E8DFD5] rounded-2xl p-6 shadow-sm hover:shadow-md mb-6 hover:border-[#E8DFD5] transition-colors">
    <div className="flex items-center gap-3 mb-4 border-b border-[#E8DFD5] pb-4">
      <div className="p-2 bg-[#9A424E]/10 text-[#9A424E] rounded-lg">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-bold text-[#4A2F1D]">{title}</h2>
    </div>
    <div className="text-[#A67C65] text-sm space-y-4">
      {children}
    </div>
  </div>
);

const AdminHelpPage = () => {
  return (
    <div className="space-y-6 pb-20 max-w-4xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[#4A2F1D] mb-2">System Information & Help</h1>
          <p className="text-[#A67C65]">Quick guides for managing your inventory.</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-[#9A424E] tracking-widest uppercase bg-[#9A424E]/10 px-3 py-1 rounded-full border border-magenta/20 mb-1">
            India Solutions CRM
          </span>
          <span className="text-[#A67C65] text-xs font-medium">Version 1.0.0</span>
        </div>
      </div>

      <HelpSection title="Dashboard & Navigation" icon={Info}>
        <p>The <strong>Dashboard</strong> provides a high-level summary of your inventory. Statistics are gathered in real-time.</p>
        <p>Use the <strong>Sidebar</strong> on the left to navigate between different management tools. If you're on a mobile device, use the hamburger menu to open the sidebar.</p>
      </HelpSection>

      <HelpSection title="Product Management" icon={Package}>
        <p><strong>Adding Products:</strong> Click "Add Product" in the Products tab. You must assign a Department and Category.</p>
        <p><strong>Bulk Actions:</strong> In the Products table, check the boxes next to products. A floating toolbar will appear at the bottom of the screen allowing you to change departments, categories, thresholds, or delete multiple items at once.</p>
        <p><strong>Stock Alerts:</strong> The system automatically calculates status (In Stock, Low Stock, Critical, Out of Stock) based on the quantities and thresholds you set. Visit the <em>Low Stock Centre</em> to manage items needing attention.</p>
      </HelpSection>

      <HelpSection title="Departments & Categories" icon={Database}>
        <p><strong>Departments:</strong> Used for top-level separation (e.g. Spare Parts vs Raw Materials).</p>
        <p><strong>Categories:</strong> Used for grouping similar items within departments (e.g. Engine Parts, Paints).</p>
        <p>If you delete a department's inventory, all products associated with it are permanently removed.</p>
      </HelpSection>

      <HelpSection title="Enquiries & Stock Management" icon={LifeBuoy}>
        <p>When you create an Enquiry, the stock is <strong>deducted automatically</strong>. The status of the enquiry determines how the stock is handled.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Pending / Confirmed:</strong> Stock remains deducted as reserved.</li>
          <li><strong>Cancelled:</strong> Stock is restored automatically.</li>
        </ul>
        <p>Every single inventory change is logged permanently in <strong>Activity Logs</strong>.</p>
      </HelpSection>

      <HelpSection title="Imports, Exports & Backups" icon={Download}>
        <p><strong>Excel Import:</strong> Upload standard `.xlsx` files using the provided template to quickly bulk-add inventory. The system prevents duplicates based on Product Codes.</p>
        <p><strong>Exports:</strong> Click "Export" on any product table to generate an Excel, CSV, or PDF file. Excel multi-sheet exports are supported for Entire Inventory exports.</p>
        <p><strong>Backups:</strong> Navigate to Settings {'>'} Backups to download a full system snapshot. You can upload these snapshots later to restore your data safely.</p>
      </HelpSection>
    </div>
  );
};

export default AdminHelpPage;
