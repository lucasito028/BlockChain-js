import Block from './Block';
import Transaction from './Translaction';

export default class BlockChain{ 
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2024", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /*
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash; 
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    */
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
    
        console.log('Block successfully mined!');
        this.chain.push(block);
    
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }
    
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    
    getBalanceOfAddress(address) {
        let balance = 0;
    
        for (const block of this.chain) {
            if (Array.isArray(block.transactions)) { // Verifica se é um array antes de iterar.
                for (const transaction of block.transactions) {
                    if (transaction.fromAddress === address) {
                        balance -= transaction.amount;
                    }
    
                    if (transaction.toAddress === address) {
                        balance += transaction.amount;
                    }
                }
            }
        }
    
        return balance;
    }
    
    isChainValid(){

        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()) { 
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}