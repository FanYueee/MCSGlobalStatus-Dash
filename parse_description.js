const fs = require('fs');

try {
    const raw = fs.readFileSync('api_response.json', 'utf16le');
    const jsonStr = raw.replace(/^\uFEFF/, '');
    const data = JSON.parse(jsonStr);
    console.log('MOTD RAW JSON:', JSON.stringify(data.motd, null, 2));
} catch (e) {
    console.error(e);
}
