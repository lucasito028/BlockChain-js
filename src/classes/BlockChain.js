import Block from './Block';

export default class BlockChain{ 
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Inicializa com o bloco gênesis
      }
    
      // Método para criar o bloco gênesis (primeiro bloco)
      createGenesisBlock() {
        return new Block(0, new Date().toISOString(), { amount: 50 }, "0");
      }
    
      // Retorna o bloco mais recente da cadeia
      getLatestBlock() {
        return this.chain[this.chain.length - 1];
      }
    
      // Adiciona um novo bloco já minerado à cadeia
      addBlock(minedBlock) {
        if (minedBlock.hash.substring(0, 3) !== "000") { // Exemplo de dificuldade 3
          console.error("Erro: O bloco não foi minerado corretamente.");
          return;
        }
        minedBlock.previousHash = this.getLatestBlock().hash; // Define o hash do bloco anterior
        this.chain.push(minedBlock); // Adiciona o bloco à cadeia
        console.log(`Bloco ${minedBlock.index} adicionado com sucesso!`);
      }
    
      // Verifica a integridade da blockchain
      isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];
    
          // Verifica se o hash atual foi alterado
          if (currentBlock.hash !== currentBlock.calculateHash()) {
            return false;
          }
    
          // Verifica se o hash do bloco anterior bate
          if (currentBlock.previousHash !== previousBlock.hash) {
            return false;
          }
        }
        return true;
      }
}