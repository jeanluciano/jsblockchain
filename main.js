const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
  }

  mineBlock(difficultty) {
    while (this.hash.substring(0, difficultty) !== Array(difficultty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.genesisBlock];
    this.genesisBlock = new Block(0, '11/10/1994', 'Genesis Block', '0');
    this.difficultty = 3;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficultty);
    this.chain.push(newBlock);
  }

  validate() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previosuBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      } else if (currentBlock.previousHash !== previosuBlock.hash) {
        return false;
      }
      return true;
    }
  }
}
