const fs = require('fs');
const servicesData = require('./src/content/services.json');
const sectionsData = require('./temp_data.cjs');

function slugify(val) {
  return val.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

for (let service of servicesData.catalog) {
  // If the service is a top-level match
  if (service.slug === 'custom-gifts-return-gifts') service.sections = sectionsData.giftsReturnSections;
  if (service.slug === 'special-entries') service.sections = sectionsData.specialEntriesSections;
  if (service.slug === 'trade-show-exhibition-planning') service.sections = sectionsData.tradeShowsSections;
  if (service.slug === 'promotions') service.sections = sectionsData.promotionsSections;
  if (service.slug === 'festivals') service.sections = sectionsData.festivalsSections;
  if (service.slug === 'house-warming') service.sections = sectionsData.houseWarmingSections;
  if (service.slug === 'party') service.sections = sectionsData.partySections;
  if (service.slug === 'sporting-events') service.sections = sectionsData.sportingEventsSections;
  if (service.slug === 'catering') service.sections = sectionsData.cateringSections;

  // Now for items inside the service
  let newItems = [];
  for (let itemName of service.items) {
    let itemSlug = slugify(itemName);
    let itemObj = { name: itemName, slug: itemSlug, sections: null };
    
    if (itemSlug === 'invitations-and-stationery') itemObj.sections = sectionsData.invitationSections;
    if (itemSlug === 'beauty-services-makeup-and-mehendi') itemObj.sections = sectionsData.beautySections;
    if (itemSlug === 'bridal-and-groom-wear-and-jewellery') itemObj.sections = sectionsData.bridalWearSections;
    if (itemSlug === 'transportation') itemObj.sections = sectionsData.transportationSections;
    if (itemSlug === 'birthday-decoration') itemObj.sections = sectionsData.birthdayDecorationSections;
    if (itemSlug === 'fun-activities') itemObj.sections = sectionsData.funActivitiesSections;
    if (itemSlug === 'networking-events') itemObj.sections = sectionsData.corporateNetworkingSections;
    if (itemSlug === 'conferences') itemObj.sections = sectionsData.conferencesSections;
    if (itemSlug === 'product-launches') itemObj.sections = sectionsData.productLaunchSections;
    if (itemSlug === 'corporate-meetings') itemObj.sections = sectionsData.corporateMeetingsSections;
    if (itemSlug === 'event-decor-and-floral-arrangements' || itemSlug === 'decorations' || itemSlug === 'theme-based-parties') itemObj.sections = sectionsData.preWeddingCeremonySections;
    if (itemSlug === 'photography-and-videography-services' || itemSlug === 'photography-and-videography') itemObj.sections = sectionsData.photographyVideographySections;
    if (itemSlug === 'catering-services' || itemSlug === 'catering') itemObj.sections = sectionsData.cateringSections;
    
    newItems.push(itemObj);
  }
  service.items = newItems;
}

fs.writeFileSync('./src/content/services.json', JSON.stringify(servicesData, null, 2));
console.log("services.json updated successfully!");
