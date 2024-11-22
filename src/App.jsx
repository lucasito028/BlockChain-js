import { useEffect, useState } from 'react';
import Block from './classes/Block.js'; // Importe a classe Block
import BlockChain from './classes/BlockChain.js'; // Importe a classe BlockChain
import { unstable_batchedUpdates } from 'react-dom';

function App() {


  const [money, setMoney] = useState(0.0);  
  const [selectedIndex, setSelectedIndex] = useState(''); // Índice do bloco selecionado
  const [selectedBlock, setSelectedBlock] = useState(null); // Bloco encontrado
  const [myBlockchain, setMyBlockchain] = useState(new BlockChain());
  const [indexBlock, setIndexBlock] = useState(1);  
  const [amount, setAmount] = useState(100);  
  const [blocks, setBlocks] = useState([]); 

  const addBlock = (e) => {
    const newBlock = new Block(
      indexBlock, 
      new Date().toISOString(),
      { amount: amount }, 
      myBlockchain.getLatestBlock().hash // Hash do último bloco
    );
  
    newBlock.mineBlock(3); // Minerar o bloco com dificuldade 3
    myBlockchain.addBlock(newBlock); // Adiciona à blockchain
  
    // Atualiza o estado
    unstable_batchedUpdates(() => {
      setIndexBlock(indexBlock + 1);
      setBlocks([...myBlockchain.chain]); // Atualiza a lista de blocos
      setAmount(100); // Reset do valor para o próximo bloco
    });
  };

  const findBlock = () => {
    const block = myBlockchain.chain.find((b) => b.index === parseInt(selectedIndex));
    if (block) {
      setSelectedBlock(block); // Define o bloco encontrado
    } else {
      alert("Bloco não encontrado!");
      setSelectedBlock(null); // Limpa o bloco selecionado se não for encontrado
    }
  };
  
  const validateBlockchain = () => {
    if (myBlockchain.isChainValid()) {
      alert("A Blockchain é válida!");
    } else {
      alert("A Blockchain foi corrompida!");
    }
  };

  const mineBlock = (difficulty) => {
    const newBlock = new Block(
      indexBlock, 
      new Date().toISOString(),
      { amount: amount }, 
      myBlockchain.getLatestBlock().hash
    );
  
    newBlock.mineBlock(difficulty); // Processo de mineração
    myBlockchain.addBlock(newBlock); // Adiciona o bloco minerado
  
    unstable_batchedUpdates(() => {
      setIndexBlock(indexBlock + 1);
      setBlocks([...myBlockchain.chain]); // Atualiza a tabela
    });
  };
  
  useEffect(() => {
    setBlocks(myBlockchain.chain); // Inicializa a tabela com o bloco gênesis
  }, [myBlockchain]);
  

  return (
    <>
      <div>
        <h1>Criar um Bloco</h1>
        <input 
          type="number" 
          placeholder="Quantia" 
          value={amount} 
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
        <button onClick={addBlock}>Adicionar Bloco</button>
      </div>

      <div>
        <h1>Minerar um Bloco</h1>
        <button onClick={() => mineBlock(4)}>Minerar com Dificuldade 4</button>
      </div>

      <div>
        <h1>Verificar Blockchain</h1>
        <button onClick={validateBlockchain}>Verificar Integridade</button>
      </div>

      <div>
        <h1>Buscar um Bloco</h1>
        <input 
          type="number" 
          placeholder="Índice do bloco" 
          value={selectedIndex} 
          onChange={(e) => setSelectedIndex(e.target.value)} 
        />
        <button onClick={findBlock}>Buscar Bloco</button>
      </div>

      {selectedBlock && (
        <div>
          <h2>Detalhes do Bloco Selecionado</h2>
          <p><strong>Index:</strong> {selectedBlock.index}</p>
          <p><strong>Timestamp:</strong> {selectedBlock.timestamp}</p>
          <p><strong>Data:</strong> {JSON.stringify(selectedBlock.data)}</p>
          <p><strong>Previous Hash:</strong> {selectedBlock.previousHash}</p>
          <p><strong>Nonce:</strong> {selectedBlock.nonce}</p>
          <p><strong>Hash:</strong> {selectedBlock.hash}</p>
        </div>
      )}

      <div>
        <h1>Listar Blockchain</h1>
        <table border="1">
          <thead>
            <tr>
              <th>Index</th>
              <th>Timestamp</th>
              <th>Data</th>
              <th>Previous Hash</th>
              <th>Nonce</th>
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr key={block.index}>
                <td>{block.index}</td>
                <td>{block.timestamp}</td>
                <td>{JSON.stringify(block.data)}</td>
                <td>{block.previousHash}</td>
                <td>{block.nonce}</td>
                <td>{block.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default App
