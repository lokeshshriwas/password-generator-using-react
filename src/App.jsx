import { useState,  useCallback, useEffect, useRef } from "react";
import "./App.css";

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
  }, [length, numAllowed, charAllowed, setPassword])


  let passwordRef = useRef(null)

  let copyToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  })

  useEffect(passwordGenerator, [length, numAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className="main-container">
        <h1>Password Generator App</h1>
        <div className="input-container">
          <input type="text" placeholder="passwords" value={password} readOnly ref={passwordRef}/>
          <button onClick={copyToClipboard} className="copybtn">COPY</button>
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
