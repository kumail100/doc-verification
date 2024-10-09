// sCrypt contract in JavaScript
const { buildContractClass, bsv } = require('scryptlib');
const { toHex } = require('scryptlib/dist/utils');

// Basic contract to store document hash
class DocumentVerification {
    constructor(hash) {
        this.hash = hash; // store document hash on-chain
    }
    
    verify(hash) {
        // Check if the stored hash matches the document's hash
        return this.hash === hash;
    }
}

// Function to generate document hash using SHA256
function generateDocumentHash(document) {
    return toHex(bsv.crypto.Hash.sha256(document));
}

// Example usage
const docHash = generateDocumentHash(Buffer.from('example document'));
const contract = new DocumentVerification(docHash);
console.log(contract);
