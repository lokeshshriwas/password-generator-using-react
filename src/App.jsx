import { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";

function App() {
  let [password, setPassword] = useState("");
  let [length, setLength] = useState(8);
  let [numAllowed, setNumAllowed] = useState(false);
  let [charAllowed, setCharAllowed] = useState(false);

  let passwordGenerator =  useCallback(()=>{
    let str = "ABCDEFGHOJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwsyz"
    if (numAllowed) str += "0123456789"
    if(charAllowed) str +="!@#$%^&*(){}`~"
    let pass = ""

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, password])

  useEffect(passwordGenerator, [length, numAllowed, charAllowed])


  return (
    <>
      <div className="main-container">
        <h1>Password Generator App</h1>
        <div className="input-container">
          <input type="text" placeholder="passwords" value={password} readOnly/>
          <button>COPY</button>
        </div>
        <div className="dependency-container">
          <div className="depend">
            <input type="range" min={8} max={50} id="inputrange" value={length} onChange={(e)=>setLength(e.target.value)} />
            <label htmlFor="inputrange">length ({length})</label>
          </div>
          <div className="depend">
            <input type="checkbox" id="numbers" value={numAllowed} onChange={(e)=>setNumAllowed((prev) => !prev)} />
            <label
              htmlFor="numbers"
            >
              Numbers
            </label>
          </div>
          <div className="depend">
            <input type="checkbox" id="specialchar" value={charAllowed} onChange={(e)=>setCharAllowed((prev) => !prev)} />
            <label htmlFor="specialchar"> Special characters </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
