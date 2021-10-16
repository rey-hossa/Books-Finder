import React, { useContext } from 'react';
import './Books.css';
import Search from "./Search";
import BookElement from "./BookElement";
import BookInfo from "./BookInfo";
import logo from "./logo/logo.svg";
import {Context} from "../App";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

function SearchedBooks(){ // Componente che visualizza la lista di libri ricercati
  const {resultState} = useContext(Context); // Importazione delle variabili dello state in App.js grazie a useContext
  const [result, setResult] = resultState;

  return(
    <div className="searched_books">
      {result.map(book =>(           // Visualizzazione della lista di libri
        <BookElement key={book.volumeInfo.title} book={book} />  // Creazione di un elemento BookElement per ogni libro trovato nell' api
      ))}
    </div>
  )
}

function Books() {

  return (
    <Router>
      <div className="books">

        <div className="books_header">
          <img className="books_logo" src={logo} />
          <Search/>
        </div>

        <hr className="separator"/>

        <Switch> {/* Il sito switcherà alla pagina del libro selezionato senza cambiare la parte dell' header */}
          <Route exact path="/books" component={SearchedBooks} />
          <Route exact path="/books/info" component={BookInfo} />
        </Switch>

      </div>
    </Router>
  );
}

export default Books;
