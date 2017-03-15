const fs = require('fs');
const _ = require('lodash');

let vendors = null;
function getVendors() {
  if (!vendors) {
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const dependencies = packageJson.dependencies;
    vendors = _.keys(dependencies);
  }
  return vendors;
}

function buildVendorEntryKey(vendorName) {
  return `vendor-${vendorName}`;
}

function getVendorEntries() {
  const vendors = getVendors();
  return _.mapKeys(vendors, buildVendorEntryKey)
}

function getVendorEntryKeys() {
  const vendors = getVendors();
  return _.map(vendors, buildVendorEntryKey);
}

module.exports = {
  getVendors,
  buildVendorEntryKey,
  getVendorEntries,
  getVendorEntryKeys,
};