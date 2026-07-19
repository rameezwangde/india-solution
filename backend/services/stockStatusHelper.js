const InventoryNotification = require('../models/InventoryNotification');
const { logActivity, ACTIVITY_TYPES } = require('./activityLogger');

/**
 * Calculates the stock status based on quantity and thresholds
 */
exports.calculateStockStatus = (quantity, criticalThreshold = 2, lowThreshold = 5) => {
  if (quantity <= 0) return 'OUT_OF_STOCK';
  if (quantity <= criticalThreshold) return 'CRITICAL_STOCK';
  if (quantity <= lowThreshold) return 'LOW_STOCK';
  return 'IN_STOCK';
};

/**
 * Handle stock status changes and create notifications
 */
exports.handleStockStatusChange = async (product, oldStatus, newStatus, performedBy = 'System') => {
  if (oldStatus === newStatus) return;

  // 1. Reset acknowledgement if status worsens or recovers to IN_STOCK
  const severityMap = {
    'IN_STOCK': 0,
    'LOW_STOCK': 1,
    'CRITICAL_STOCK': 2,
    'OUT_OF_STOCK': 3
  };

  const oldSeverity = severityMap[oldStatus] || 0;
  const newSeverity = severityMap[newStatus] || 0;

  let shouldResetAck = false;
  if (newSeverity > oldSeverity) {
    shouldResetAck = true; // Status worsened
  } else if (newSeverity === 0) {
    shouldResetAck = true; // Recovered fully
  }

  if (shouldResetAck) {
    product.stockAlertAcknowledged = false;
    product.stockAlertAcknowledgedBy = null;
    product.stockAlertAcknowledgedAt = null;
  }

  // 2. Generate Notification
  let notificationType, severity, message, title;
  
  if (newStatus === 'OUT_OF_STOCK') {
    notificationType = 'OUT_OF_STOCK';
    severity = 'critical';
    title = 'Out of Stock Alert';
    message = `${product.name} is completely out of stock.`;
  } else if (newStatus === 'CRITICAL_STOCK') {
    notificationType = 'CRITICAL_STOCK';
    severity = 'high';
    title = 'Critical Stock Alert';
    message = `${product.name} has reached critical stock level (${product.quantity} remaining).`;
  } else if (newStatus === 'LOW_STOCK' && oldStatus === 'IN_STOCK') {
    notificationType = 'LOW_STOCK';
    severity = 'medium';
    title = 'Low Stock Alert';
    message = `${product.name} is running low (${product.quantity} remaining).`;
  } else if (newStatus === 'IN_STOCK' && oldStatus !== 'IN_STOCK') {
    notificationType = 'STOCK_RESTORED';
    severity = 'info';
    title = 'Stock Restored';
    message = `${product.name} stock has been restored to healthy levels (${product.quantity}).`;
  }

  if (notificationType) {
    try {
      await InventoryNotification.create({
        type: notificationType,
        title,
        message,
        productId: product._id,
        productCode: product.productCode,
        productName: product.name,
        department: product.department,
        severity
      });
      
      product.lastStockAlertAt = new Date();
    } catch (err) {
      console.error('Failed to create inventory notification:', err);
    }
  }

  // 3. Generate Activity Log
  const activityTypeMap = {
    'OUT_OF_STOCK': ACTIVITY_TYPES.PRODUCT_OUT_OF_STOCK || 'PRODUCT_OUT_OF_STOCK',
    'CRITICAL_STOCK': 'PRODUCT_CRITICAL_STOCK',
    'LOW_STOCK': 'PRODUCT_LOW_STOCK',
    'IN_STOCK': 'PRODUCT_STOCK_RESTORED'
  };

  const activityType = activityTypeMap[newStatus];

  if (activityType) {
    await logActivity({
      activityType,
      productId: product._id,
      productName: product.name,
      department: product.department,
      quantityDifference: 0,
      newQuantity: product.quantity,
      previousQuantity: product.quantity,
      metadata: { oldStatus, newStatus },
      remarks: `Stock status changed from ${oldStatus.replace('_', ' ')} to ${newStatus.replace('_', ' ')}`,
      performedBy,
      referenceType: 'None'
    });
  }
};
