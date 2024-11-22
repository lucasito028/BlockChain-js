import Block from './Block';

export default class BlockChain{ 
    constructor() {
        this.chain = [this.createGenesisBlock()]; 
      }
    
      createGenesisBlock() {
        return new Block(0, new Date().toISOString(), { amount: 50 }, "0");
      }
    
      getLatestBlock() {
        return this.chain[this.chain.length - 1];
      }
    
      addBlock(minedBlock) {
        if (minedBlock.hash.substring(0, 3) !== "000") { 
          console.error("Erro: O bloco nao foi minerado corretamente.");
          return;
        }
        minedBlock.previousHash = this.getLatestBlock().hash; 
        this.chain.push(minedBlock); 
        console.log(`Bloco ${minedBlock.index} adicionado com sucesso!`);
      }
    
      isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];
    
          if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
          }
    
          if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
          }
        }
        return true;
      }
}