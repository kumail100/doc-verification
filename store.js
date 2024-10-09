const { bsv, Transaction, PrivateKey } = require('bsv');

// Your private key and the document's hash
const privateKey = new PrivateKey('your-private-key');
const documentHash = generateDocumentHash(Buffer.from('example document'));

const tx = new Transaction()
  .from(utxos)  // UTXOs you're using to fund the transaction
  .addOutput(new Transaction.Output({
    script: bsv.Script.buildDataOut(documentHash), // Store the hash
    satoshis: 0,
  }))
  .sign(privateKey);

console.log(tx.serialize());
