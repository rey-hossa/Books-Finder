
import React, {useState} from 'react';
import './App.css';
import Home from "./components/Home";
import Books from "./components/Books";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

export const Context = React.createContext();

function App() {

  const [bookInput, setBookInput] = useState(""); // Input inserito dall' utente
  const [result, setResult] = useState([]); // Dati ottenuti dall' api
  const [currentBook, setCurrentBook] = useState([]); // Libro selezionato

  return (
    <Router>
      <div className="App">
        <Context.Provider value={{resultState:[result, setResult], currentBookState:[currentBook, setCurrentBook], bookInputState:[bookInput, setBookInput]}}>  {/* Per avere queste variabili in tutti i file dentro il tag (in questo caso tutti)*/}
          <Switch>
            <Route exact path="/" component={Home} /> {/* Se si va su "nome del sito" + / verrà caricata la pagina Home */}
            <Route exact path="/books" component={Books} /> {/* Se si va su "nome del sito" + /books verrà caricata la pagina Books */}
          </Switch>
        </Context.Provider>
      </div>
    </Router>
  );
}

export default App;
