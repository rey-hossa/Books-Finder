import React, { useContext } from 'react';
import './BookInfo.css';
import {Context} from "../App";
import {Link} from "react-router-dom";
import bookmark from "./logo/bookmark.png";

function BookInfo() { // Funzione per creare un array con il dato preso dall' api

  function arrayFilter(array, arrayList){
    if(array == undefined){
      arrayList[0] = "Unknown";
    }else{
      arrayList[0] = array[0];
      for(let i=1; i < array.length; i++ ){
        if(array[i] == undefined){}else{ arrayList[i] = ", " + array[i]; }
      }
    }
  }

  const {currentBookState} = useContext(Context); // Importazione delle variabili dello state in App.js grazie a useContext
  const [currentBook, setCurrentBook] = currentBookState;

  //Per ogni variabile viene fatto un controllo per vedere se esiste perchè non sempre lo sono
  let image = currentBook.book.volumeInfo.imageLinks;
  let title = currentBook.book.volumeInfo.title === undefined ? "Title Unknown" : `${currentBook.book.volumeInfo.title}`;
  let subtitle = currentBook.book.volumeInfo.subtitle === undefined ? "" : `${currentBook.book.volumeInfo.subtitle}`;
  let publishedDate = currentBook.book.volumeInfo.publishedDate === undefined ? "Unknown" : `${currentBook.book.volumeInfo.publishedDate}`;
  let publisher = currentBook.book.volumeInfo.publisher === undefined ? "Unknown" : `${currentBook.book.volumeInfo.publisher}`;
  let description = currentBook.book.volumeInfo.description === undefined ? "" : `${currentBook.book.volumeInfo.description}`;
  let previewLink = currentBook.book.volumeInfo.previewLink === undefined ? "" : `${currentBook.book.volumeInfo.previewLink}`;
  let infoLink = currentBook.book.volumeInfo.infoLink === undefined ? "" : `${currentBook.book.volumeInfo.infoLink}`;

  // Queste variabili essendo degli array viene fatto un processo un po' diverso per fare il controllo
  let authors = currentBook.book.volumeInfo.authors;
  let authorsList = [] ;
  arrayFilter(authors, authorsList);

  let categories = currentBook.book.volumeInfo.categories;
  let categoriesList = [];
  arrayFilter(categories, categoriesList);

  let isbn = currentBook.book.volumeInfo.industryIdentifiers;
  let isbnList = [];
  isbnList[0] = isbn[0] === undefined ? "" : `${isbn[0].identifier}`;
  isbnList[1] = isbn[1] === undefined ? "" : `${isbn[1].identifier}`;

  let isbn2;
  if( isbnList[1] == "" ){ isbn2 = ""; }else{ isbn2 = "ISBN 2:"; }


  return (
    <div className="info_page">
      <div className="book_info">

        <div className="book_info_container">
          <div  className="book_info_sx">
            <img className="book_info_image" src={ image === undefined ? "" : `${image.thumbnail}` } alt="Image not found"  />
            <button className="book_info_preview"> <a href={previewLink} target="_blank">Preview</a> </button>
            <button className="book_info_preview book_info_infoLink"> <a href={infoLink} target="_blank">Google Books</a> </button>
          </div>
          <div className="book_info_information">
            <span className="book_info_title">{title}</span><br/>
            <span className="book_info_subtitle">{subtitle}</span><br/>
            <p className="book_info_authors">Authors: <b>{authorsList}</b> </p>
            <p className="book_info_publishedDate">Categories: <b>{categoriesList}</b> </p>
            <p className="book_info_publishedDate">Published Date: <b>{publishedDate.slice(0,4)}</b> </p>
            <p className="book_info_publishedDate">Publisher: <b>{publisher}</b> </p>
            <span className="book_info_ISBN1">ISBN 1: <b>{isbnList[0]}</b></span><br/>
            <span className="book_info_ISBN2">{isbn2} <b>{isbnList[1]}</b></span>
            <p className="book_info_description">{description}</p>
          </div>
        </div>
        <img className="bookmark" src={bookmark}  />
      </div>
      <Link to="/books"> {/* Pulsante per tornare indietro */}
      <button className="back_button"><i className="fas fa-angle-left"></i> BACK</button>
      </Link>
    </div>

  );
}

export default BookInfo;
