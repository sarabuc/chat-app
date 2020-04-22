import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/list';
import msgService from './msgs';
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3001');
console.log(socket)

const App=()=> {

  const [msgs, setMsgs] = useState([]) 
  const [newMsg, setNewMsg] = useState('') 
  

  useEffect(() => {
    msgService
      .getAll()
      .then(initial => {
        console.log(initial)
        setMsgs(msgs.concat(initial))
        console.log('HHHHHEEEEEEEEEEEEEERRRRRRRRRRRREEEEEEEEE')
      })
      
  }, [])
  socket.on('connect', () =>{
    console.log("connect socket")
    })
    socket.on('message', (msg)=>{
      console.log('message', msg)
    })
    socket.on('newChat', (newOb) => {
      console.log(msgs, newOb)
      setMsgs(msgs.concat(newOb))
      console.log('99999999999999999999999999999999RRRRREEEEEEEEE')

    })

  const handleMsgChange = (event) => {
    setNewMsg(event.target.value)
  }

  const addMsg = (event) => {
    event.preventDefault()
    const msgObject = {
      msg: newMsg,
      username:"sara"
    }

    msgService
      .create(msgObject)
      .then(data => {
        console.log(data)
        setNewMsg('')
      })
  }

  
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <div>
        <List list={msgs}/>
        <form onSubmit={addMsg}>
        <input
          value={newMsg} 
          onChange={handleMsgChange}
        />
        <button type="submit">save</button>
      </form>      
      </div>
      </header>

    </div>
  );
}

export default App;
