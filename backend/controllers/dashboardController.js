const Product = require('../models/Product');
const Category = require('../models/Category');
const Enquiry = require('../models/Enquiry');

let ImportHistory = null;
try {
  ImportHistory = require('../models/ImportHistory');
} catch (e) {
  // Ignore
}

exports.getDashboard = async (req, res) => {
  try {
    const [
      productStats,
      totalCategories,
      enquiryStatsRaw,
      inventoryByCategory,
      recentProducts,
      recentEnquiries,
      recentImports,
      lowStockProductsRaw
    ] = await Promise.all([
      Product.aggregate([
        {
          $group: {
            _id: null,
            totalProducts: { $sum: 1 },
            totalInventoryQuantity: { $sum: { $ifNull: ["$quantity", 0] } },
            outOfStockProducts: { 
              $sum: { 
                $cond: [{ $or: [{ $eq: ["$quantity", 0] }, { $eq: ["$status", "out_of_stock"] }] }, 1, 0] 
              } 
            },
            lowStockProducts: { 
              $sum: { 
                $cond: [{ $and: [{ $gt: ["$quantity", 0] }, { $lte: ["$quantity", 5] }, { $ne: ["$status", "out_of_stock"] }] }, 1, 0] 
              } 
            }
          }
        }
      ]),
      Category.countDocuments(),
      Enquiry.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),
      Product.aggregate([
        {
          $group: {
            _id: "$category",
            productCount: { $sum: 1 },
            totalQuantity: { $sum: { $ifNull: ["$quantity", 0] } }
          }
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "categoryDetails"
          }
        },
        { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            categoryId: "$_id",
            categoryName: { $ifNull: ["$categoryDetails.name", "Uncategorized"] },
            productCount: 1,
            totalQuantity: 1
          }
        },
        { $sort: { totalQuantity: -1 } },
        { $limit: 8 }
      ]),
      Product.find().sort({ createdAt: -1 }).limit(5).populate('category', 'name').lean(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      ImportHistory ? ImportHistory.find().sort({ createdAt: -1 }).limit(5).lean() : Promise.resolve([]),
      Product.find({ quantity: { $gt: 0, $lte: 5 }, status: { $ne: 'out_of_stock' } }).populate('category', 'name').limit(5).lean()
    ]);

    const pStats = productStats[0] || { totalProducts: 0, totalInventoryQuantity: 0, outOfStockProducts: 0, lowStockProducts: 0 };
    const availableProducts = pStats.totalProducts - pStats.outOfStockProducts;

    const allStatuses = ["Pending", "Contacted", "Quotation Sent", "Confirmed", "Completed", "Cancelled"];
    const mappedStatuses = {
      pending: "Pending",
      contacted: "Contacted",
      quotation_sent: "Quotation Sent",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled"
    };

    const statusCounts = {};
    allStatuses.forEach(s => statusCounts[s] = 0);
    
    let totalEnquiries = 0;
    enquiryStatsRaw.forEach(e => {
      const statusLabel = e._id || "Pending";
      if(statusCounts[statusLabel] !== undefined) {
        statusCounts[statusLabel] = e.count;
      }
      totalEnquiries += e.count;
    });

    const enquiryStatusDistribution = allStatuses.map(s => ({
      status: Object.keys(mappedStatuses).find(k => mappedStatuses[k] === s) || s.toLowerCase(),
      label: s,
      count: statusCounts[s]
    }));

    res.status(200).json({
      success: true,
      summary: {
        totalProducts: pStats.totalProducts,
        totalCategories,
        totalInventoryQuantity: pStats.totalInventoryQuantity,
        availableProducts,
        lowStockProducts: pStats.lowStockProducts,
        outOfStockProducts: pStats.outOfStockProducts,
        totalEnquiries,
        pendingEnquiries: statusCounts["Pending"] || 0,
        contactedEnquiries: statusCounts["Contacted"] || 0,
        quotationSentEnquiries: statusCounts["Quotation Sent"] || 0,
        confirmedEnquiries: statusCounts["Confirmed"] || 0,
        completedEnquiries: statusCounts["Completed"] || 0,
        cancelledEnquiries: statusCounts["Cancelled"] || 0
      },
      inventoryByCategory,
      enquiryStatusDistribution,
      lowStockProductsList: lowStockProductsRaw.map(p => ({
        _id: p._id,
        name: p.name,
        category: p.category ? p.category.name : 'Uncategorized',
        quantity: p.quantity
      })),
      recentProducts: recentProducts.map(p => ({
        _id: p._id,
        name: p.name,
        productCode: p.productCode || p.code,
        image: p.image,
        category: p.category ? p.category.name : (p.department || 'Uncategorized'),
        quantity: p.quantity,
        status: p.status,
        createdAt: p.createdAt
      })),
      recentEnquiries: recentEnquiries.map(e => ({
        _id: e._id,
        referenceNumber: e.referenceNumber,
        customerName: e.customerName,
        phone: e.phone,
        status: e.status,
        totalItems: e.totalItems,
        createdAt: e.createdAt
      })),
      recentImports: recentImports.map(i => ({
        _id: i._id,
        fileName: i.fileName,
        createdCount: i.createdCount,
        updatedCount: i.updatedCount,
        skippedCount: i.skippedCount,
        failedCount: i.failedCount,
        status: i.status,
        createdAt: i.createdAt
      }))
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Failed to load dashboard data", error: error.message });
  }
};
