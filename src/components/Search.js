import './Search.css';
import React, { useContext } from 'react';
import {Context} from "../App";
import {Link} from "react-router-dom";
import axios from 'axios';

require('dotenv').config();

function Search() {

  const {resultState, bookInputState} = useContext(Context); // Importazione delle variabili dello state in App.js grazie a useContext
  const [result, setResult] = resultState;
  const [bookInput, setBookInput] = bookInputState;

  /*document.getElementById("input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("search_button").click();
    }
  });*/

  function handleChange(event){ // A ogni digitazione dell' utente verra preso il valore e impostato in bookInput
    let input = event.target.value;
    setBookInput(input);
  }

  async function handleBooks(){
    try{
      let bookName = bookInput;
      if(bookName == ""){ // Se l' input è vuoto non fa niente altrimenti lo ricerca nell' api
        setResult([]);
      }else{

        let data;
        let rawData;

        if (process.env.NODE_ENV == "development"){
          const apiKey = process.env.REACT_APP_API_KEY;

          rawData = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + bookName + "&key=" + apiKey +"&maxResults=40");
          data = await rawData.json();
        }else if (process.env.NODE_ENV == "production"){
          rawData = await axios.get("/.netlify/functions/lambda?bookName="+bookName);
          data = await rawData.data;
        }

        if(data.items === undefined){ // Se non è stato trovato il libro manda l' alert
          setResult([]);
          alert("Book not found");
        }else{
          setResult(data.items);
        }

      }

    }catch(error){
      console.error(error);
    }

  }

  return (
    <div className="search">
      <input id="input" type="text" onChange={handleChange} value={bookInput} placeholder="Book Name or Author" /> {/* Il valore viene impostato con bookInput in questo modo rimane nell' input acnhe cambiando pagina */}
      <Link to="/books" style={{ textDecoration: 'none' }}><i id="search_button" className="fas fa-search" onClick={handleBooks}></i></Link>
    </div>
  );
}

export default Search;
