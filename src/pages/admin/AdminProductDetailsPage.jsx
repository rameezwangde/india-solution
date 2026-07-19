import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/productService';
import { getProductActivity } from '../../api/activityService';
import { format } from 'date-fns';
import { ArrowLeft, Package, Activity, Box, Tag, Edit, Trash2, ArrowRight, ArrowDownRight, ArrowUpRight, Plus, FileSpreadsheet } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import ProductFormModal from '../../components/admin/products/ProductFormModal';
import UpdateQuantityModal from '../../components/admin/products/UpdateQuantityModal';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'PRODUCT_CREATED': return <Plus size={16} className="text-green-400" />;
      case 'PRODUCT_UPDATED': return <Edit size={16} className="text-blue-400" />;
      case 'PRODUCT_DELETED': return <Trash2 size={16} className="text-red-400" />;
      case 'EXCEL_IMPORT': return <FileSpreadsheet size={16} className="text-green-400" />;
      case 'QUANTITY_INCREASED': return <ArrowUpRight size={16} className="text-green-400" />;
      case 'QUANTITY_DECREASED': return <ArrowDownRight size={16} className="text-red-400" />;
      case 'STOCK_RESERVED': return <ArrowDownRight size={16} className="text-orange-400" />;
      case 'STOCK_RESTORED': return <ArrowUpRight size={16} className="text-blue-400" />;
      default: return <Activity size={16} className="text-gray-400" />;
    }
  };

  const formatActivityName = (type) => {
    return type.replace(/_/g, ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
        <Activity size={48} className="mx-auto mb-4 opacity-20 text-gray-400" />
        <p className="text-gray-400">No activity recorded for this product yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Activity size={24} className="text-magenta" />
        Activity Timeline
      </h3>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {activities.map((activity, idx) => (
          <div key={activity._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0B0A10] bg-navy-800 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              {getActivityIcon(activity.activityType)}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-4 rounded-xl shadow">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-white text-sm">{formatActivityName(activity.activityType)}</h4>
                <time className="text-xs font-medium text-magenta">
                  {format(new Date(activity.performedAt), 'MMM dd, yyyy hh:mm a')}
                </time>
              </div>
              <p className="text-sm text-gray-400 mb-2">{activity.remarks}</p>
              
              {activity.quantityDifference !== 0 && (
                <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg text-sm border border-white/5">
                  <span className="text-gray-400 line-through">Qty {activity.previousQuantity}</span>
                  <ArrowRight size={14} className="text-gray-500" />
                  <span className={activity.quantityDifference > 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                    Qty {activity.newQuantity}
                  </span>
                </div>
              )}
              
              <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
                <span>By: {activity.performedBy}</span>
                {activity.referenceType !== 'None' && (
                  <span>Ref: {activity.referenceId} ({activity.referenceType})</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();
  
  const [product, setProduct] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isQtyOpen, setIsQtyOpen] = useState(false);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const [prodRes, actRes] = await Promise.all([
        getProductById(id),
        getProductActivity(id)
      ]);
      
      if (prodRes.success) {
        setProduct(prodRes.product);
      }
      
      if (actRes.success) {
        setActivities(actRes.activities);
      }
    } catch (err) {
      console.error(err);
      error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <Link to="/admin/products" className="text-magenta hover:underline">Return to Products</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <Link to="/admin/products" className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} className="text-white" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{product.name}</h1>
          <p className="text-gray-400 flex items-center gap-2">
            <span className="text-magenta">{product.productCode}</span>
            <span>•</span>
            <span>{product.department}</span>
          </p>
        </div>
        <div className="ml-auto flex gap-3">
          <button 
            onClick={() => setIsQtyOpen(true)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            <Box size={16} /> Update Stock
          </button>
          <button 
            onClick={() => setIsEditOpen(true)}
            className="px-4 py-2 bg-gradient-to-r from-magenta to-orange text-white rounded-lg hover:shadow-lg hover:shadow-magenta/20 transition-all flex items-center gap-2"
          >
            <Edit size={16} /> Edit Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Product Overview Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="h-48 bg-navy-800 relative">
              {product.image?.url ? (
                <img src={product.image.url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={48} className="text-gray-600" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  product.status === 'available' ? 'bg-green-500/20 text-green-400 border border-green-500/20' : 
                  product.status === 'out_of_stock' ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 
                  'bg-gray-500/20 text-gray-400 border border-gray-500/20'
                }`}>
                  {product.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Current Quantity</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">{product.quantity}</span>
                  <span className="text-gray-400 mb-1">{product.quantityUnit || 'units'}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm flex items-center gap-2"><Tag size={16}/> Category</span>
                  <span className="text-white font-medium">{product.category?.name || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm flex items-center gap-2"><Box size={16}/> Department</span>
                  <span className="text-white font-medium">{product.department || '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ActivityTimeline activities={activities} />
        </div>
      </div>
      
      {isEditOpen && (
        <ProductFormModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          product={product}
          onSuccess={fetchProductData}
        />
      )}
      
      {isQtyOpen && (
        <UpdateQuantityModal
          isOpen={isQtyOpen}
          onClose={() => setIsQtyOpen(false)}
          product={product}
          onSuccess={fetchProductData}
        />
      )}
    </div>
  );
};

export default AdminProductDetailsPage;
