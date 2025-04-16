import './App.css';
import React2048 from "./components/2048minigame.js"
import DateTime from './components/DateTime.js';
import Feed from './components/Feed.js';

function App() {

 
  return (
    <div className="App">
      <div className="App-body">
        <Feed pos={1} channel="UChqrDOwARrxdJF-ykAptc7w"/>
        <Feed pos={2} channel="UC-CBSBRP82j2t5PQ3M33CVw"/>
        <DateTime />
        <React2048 />

      </div>
      
    </div>
  );
}

export default App;
