import { useEffect, useState } from 'react';
import BlockChain from './classes/BlockChain';
import Transaction from './classes/Translaction';

function App() {

  useEffect(() => {

    /*
    let savjeeCoin = new BlockChain();

    savjeeCoin.addBlock(new Block(1, "10/07/2017", { amount: 4 })); 
    savjeeCoin.addBlock (new Block (2, "12/07/2017", { amount: 10 }));

    console.log('Is blockchain valid?' + savjeeCoin.isChainValid());
    savjeeCoin.chain[1].data = { amount: 100 };

    savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash();
    console.log('Is blockchain valid?' + savjeeCoin.isChainValid());

    console.log(savjeeCoin);
    */

    /*
    let savjeeCoin = new BlockChain();

    console.log("Mining block 1...");
    savjeeCoin.addBlock(new Block(1, "28/07/2017", {anunt: 4 }));
    
    console.log("Mining black 2...");
    savjeeCoin.addBlock(new Block(2, "28/87/2817", {ancunt: 8 }));
    */
   
  }, []);

  return (
    <>   
    </>
  )
}

export default App
