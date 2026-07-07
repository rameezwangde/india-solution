import { motion } from 'framer-motion';
import { Shield, Settings, Users, AlertTriangle, Image as ImageIcon, Database } from 'lucide-react';

const AdminPreviewSection = () => {
  const features = [
    { icon: <Shield size={24} />, title: "Secure Admin Login", desc: "Role-based access control for staff" },
    { icon: <Database size={24} />, title: "Add/Edit Products", desc: "Manage inventory catalog seamlessly" },
    { icon: <ImageIcon size={24} />, title: "Media Uploads", desc: "Bulk image uploads for products" },
    { icon: <Settings size={24} />, title: "Manage Categories", desc: "Organize products dynamically" },
    { icon: <Users size={24} />, title: "Customer Enquiries", desc: "Track and respond to leads in CRM" },
    { icon: <AlertTriangle size={24} />, title: "Low Stock Alerts", desc: "Automated inventory notifications" },
  ];

  return (
    <section className="py-20 border-t border-white/5 bg-black/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-magenta/30 bg-magenta/10 text-magenta text-sm font-medium mb-6">
            Backend Preview
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Powerful Admin CRM
          </h2>
          <p className="text-gray-400">
            This demo showcases the frontend experience. The final system includes a secure backend CRM where you can manage your entire inventory, track enquiries, and monitor stock levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="bg-gradient-to-br from-magenta to-orange w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPreviewSection;
