import React, { useContext } from 'react';
import './BookElement.css';
import {Link} from "react-router-dom";
import {Context} from "../App";

function BookElement(book) {

  const {currentBookState} = useContext(Context); // Importazione delle variabili dello state in App.js grazie a useContext
  const [currentBook, setCurrentBook] = currentBookState;

  let image = book.book.volumeInfo.imageLinks;
  let title = book.book.volumeInfo.title === undefined ? "Title Unknown" : `${book.book.volumeInfo.title}`;
  let publishedDate = book.book.volumeInfo.publishedDate === undefined ? "" : `${book.book.volumeInfo.publishedDate}`;

  let authors = book.book.volumeInfo.authors;
  let authorsList = [] ;
  if(authors === undefined){ // Creazione di un array con gli autori
    authorsList[0] = "Unknown";
  }else{
    authorsList[0] = authors[0];
    for(let i=1; i < authors.length; i++ ){
      if(authors[i] === undefined){}else{ authorsList[i] = ", " + authors[i]; }
    }
  }

  //console.log(authorsList);

  return (
    <div className="book_element">
      <img src={ image === undefined ? "" : `${image.thumbnail}` } alt="Image not found"  />
      <div className="book_information">
        <span className="title">{title.slice(0,102)}</span>
        <br/>
        <span className="authors">{authorsList}  </span>
        <br/>
        <span className="published_date"> {publishedDate === undefined ? "" : `${publishedDate.slice(0,4)}`} </span>
      </div>

      <Link to="/books/info"> {/* Se si clicca sul pulsante verrà caricata la pagina relativa alle inforzioni di questo libro */}
        <button className="more_info" type="button" onClick={()=>setCurrentBook(book)}> MORE INFO</button> {/* Al click sul pulsante la variabile dello state CurrentBook viene inpostata a questo libro, in questo modo posso riprendere i dati nella sua specifica pagina */}
      </Link>
    </div>
  );
}

export default BookElement;
