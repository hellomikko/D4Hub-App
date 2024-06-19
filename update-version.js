const fs = require('fs');

// Read the current package.json file
const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

// Update the version number
const version = packageJson.version.split('.');
version[version.length - 1] = parseInt(version[version.length - 1], 10) + 1;
packageJson.version = version.join('.');

// Write the updated package.json file
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

console.log(`Updated version number to ${packageJson.version}`);