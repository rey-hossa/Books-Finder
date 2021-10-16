import './Prova.css';
import React, { useState } from 'react';

function Search() {
  const [result, setResult] = useState([]);

  async function handleBooks(){
    let bookName = document.getElementById('input').value;
    let apiKey = "AIzaSyBz2QRNoxl41nROKIsWdY2Gziki2sh1wW4";
    let rawData = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + bookName + "&key=" + apiKey +"&maxResults=40");
    let data = await rawData.json();
    console.log(data.items);
    setResult(data.items);

  }

  return (
    <>
      <div className="search">
        <input id="input" type="text" placeholder="Book name" />
        <button id="search-button" type="button" onClick={handleBooks}>Search</button>
      </div>
      <div className="books">
        {result.map(book =>(
          <img src={ book.volumeInfo.imageLinks === undefined ? "" : `${book.volumeInfo.imageLinks.thumbnail}` } alt={book.title} /> //book.volumeInfo.imageLinks.thumbnail
        ))}

      </div>
    </>
  );
}

export default Search;
