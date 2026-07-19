const InventoryActivity = require('../models/InventoryActivity');

const ACTIVITY_TYPES = {
  PRODUCT_CREATED: 'PRODUCT_CREATED',
  PRODUCT_UPDATED: 'PRODUCT_UPDATED',
  PRODUCT_DELETED: 'PRODUCT_DELETED',
  EXCEL_IMPORT: 'EXCEL_IMPORT',
  QUANTITY_INCREASED: 'QUANTITY_INCREASED',
  QUANTITY_DECREASED: 'QUANTITY_DECREASED',
  STOCK_RESERVED: 'STOCK_RESERVED',
  STOCK_RESTORED: 'STOCK_RESTORED',
  CATEGORY_CHANGED: 'CATEGORY_CHANGED',
  DEPARTMENT_CHANGED: 'DEPARTMENT_CHANGED',
  STATUS_CHANGED: 'STATUS_CHANGED',
  MANUAL_ADJUSTMENT: 'MANUAL_ADJUSTMENT',
  PRODUCT_LOW_STOCK: 'PRODUCT_LOW_STOCK',
  PRODUCT_CRITICAL_STOCK: 'PRODUCT_CRITICAL_STOCK',
  PRODUCT_OUT_OF_STOCK: 'PRODUCT_OUT_OF_STOCK',
  THRESHOLD_CHANGED: 'THRESHOLD_CHANGED',
  ALERT_ACKNOWLEDGED: 'ALERT_ACKNOWLEDGED',
  ALERT_UNACKNOWLEDGED: 'ALERT_UNACKNOWLEDGED'
};

/**
 * Logs an inventory activity.
 * @param {Object} data
 * @param {String} data.productId
 * @param {String} data.productCode
 * @param {String} data.productName
 * @param {String} data.department
 * @param {String} data.category
 * @param {String} data.activityType - One of ACTIVITY_TYPES
 * @param {String} data.performedBy - User email, ID, or "System"
 * @param {String} [data.referenceType] - 'Enquiry', 'Import', 'Manual', 'None'
 * @param {String} [data.referenceId]
 * @param {Number} [data.previousQuantity]
 * @param {Number} [data.newQuantity]
 * @param {String} [data.remarks]
 * @param {Object} [data.metadata]
 */
const logActivity = async (data) => {
  try {
    const quantityDifference = (data.newQuantity || 0) - (data.previousQuantity || 0);

    const activity = new InventoryActivity({
      ...data,
      quantityDifference
    });
    
    await activity.save();
    return activity;
  } catch (error) {
    console.error('Failed to log inventory activity:', error);
    // We intentionally don't throw here to avoid failing the main business logic if logging fails
  }
};

module.exports = {
  ACTIVITY_TYPES,
  logActivity
};
