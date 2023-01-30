const hash = require('crypto-js/sha256')

class Block {
    constructor(prevHash, data){
        this.prevHash = prevHash;
        this.data = data;
        this.timeStamp = new Date()

        this.hash = this.calculateHash()
    }

    // hash
    calculateHash() {
        return hash(this.prevHash + JSON.stringify(this.data) + this.timeStamp).toString()
    }

    // mine
    mine(){
        while (!this.hash.startsWith('0000')) {
            this.mineVar++
            this.hash = this.calculateHash()
        }
    }
}

class BlockChain {
    constructor() {
        const genesisBlock = new Block('0000', {isGenesisBlock: true})

        this.chain = [genesisBlock]
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1]
    }

    addBlock(data){
        const lastBlock = this.getLastBlock()
        const newBlock = new Block(lastBlock.hash, data)
        newBlock.mine()

        this.chain.push(newBlock)
    }

    isValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i]
            const prevBlock = this.chain[i - 1]

            if (currBlock.hash != currBlock.calculateHash()){
                return false
            }

            if (currBlock.prevHash != prevBlock.hash){
                return false
            }
        }

        return true
    }
}

const KChain = new BlockChain();
console.log(KChain)

// add Block
KChain.addBlock({from: 'Kiet', to: 'K97', amount: 100})
KChain.addBlock({from: 'Kiet', to: 'John', amount: 500})
KChain.addBlock({code: 'demo', language: 'js'})

console.log(KChain.chain)
console.log('Valid: ' , KChain.isValid())

// // change Data
// KChain.chain[1].data = {
//     from: 'Kiet',
//     to: 'aaa',
//     amount: 100
// }

// // Log valid false
// console.log(KChain.chain)
// console.log('Valid: ' , KChain.isValid())