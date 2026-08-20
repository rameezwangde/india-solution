const fs = require('fs');

try {
  let code = fs.readFileSync('src/pages/ServiceDetail.jsx', 'utf-8');
  
  const startIndex = code.indexOf('const invitationSections = [');
  const endIndex = code.indexOf('const DetailTitle = ');
  let dataCode = code.substring(startIndex, endIndex);
  
  // Convert JSX descriptions to strings
  dataCode = dataCode.replace(/description:\s*\(\s*<>\s*(.*?)\s*<\/>\s*\),/gs, (match, inner) => {
      let text = inner.replace(/<(strong|b)>/g, '**').replace(/<\/(strong|b)>/g, '**');
      text = text.replace(/"/g, '\\"').replace(/\n/g, ' ');
      return `description: "${text}",`;
  });
  
  // Change items: to listItems:
  dataCode = dataCode.replace(/items:/g, 'listItems:');
  
  const wrapped = `
  ${dataCode}
  module.exports = {
    invitationSections, beautySections, bridalWearSections, giftsReturnSections, specialEntriesSections, transportationSections, birthdayDecorationSections, funActivitiesSections, corporateNetworkingSections, conferencesSections, productLaunchSections, corporateMeetingsSections, preWeddingCeremonySections, partySections, sportingEventsSections, houseWarmingSections, festivalsSections, promotionsSections, tradeShowsSections, cateringSections, photographyVideographySections
  };
  `;
  fs.writeFileSync('temp_data.cjs', wrapped);
  console.log("temp_data.cjs written successfully!");
} catch(e) {
  console.error(e);
}
