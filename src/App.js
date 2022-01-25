
import './App.css';
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import FrontPage from './components/frontpage';
// import Chat from './components/chat';
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect('http://localhost:4000');


function App() {
  const [state,setState] = useState({message: '', name: ''});
  const [chat, setChat] = useState([]);

  const renderChat = () => {
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }
dasdsadasdsa
  const onMessageSubmit = (e) =>{
    e.preventDefault();
    const {name, message} = state;
    try{
     socket.emit("message", {name, message});
    }catch{
      console.log("serevr not found")
    };
    setState({ message: "", name },[]);
  }

  useEffect(() => {
    socket.on('message',({ name, message}) => {
      setChat([...chat, { name, message }])
    })
  });


  const onTextChange = (e,targetValue) => {
    setState({...state, [targetValue]: e.target.value})
  }

  return (
    <div>
      <form onSubmit={onMessageSubmit}>
        <h1>Message here VV</h1>
        <div>
          <input onChange={e => onTextChange(e,'name')} value={state.name} label="name" placeholder='input your name'></input>
        </div>
        <div>
          <input onChange={e => onTextChange(e,'message')} value={state.message} label="message" placeholder='input your message'></input>
        </div>
        <button>Send Message</button>
      </form>
      <div>
        <h1>chats</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
