import './App.css';
import React2048 from "./components/2048minigame.js"
import DateTime from './components/DateTime.js';

function App() {
 
  return (
    <div className="App">
      <div className="App-body">
        <DateTime />
        <React2048 />

      </div>
      
    </div>
  );
}

export default App;
