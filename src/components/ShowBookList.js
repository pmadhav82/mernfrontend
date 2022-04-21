import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import{Link}from 'react-router-dom';
const ShowBookList = ()=>{
const [books, setBook]= useState([]);
const[ispending , setPending]= useState(true);
const[ error, setError] = useState(null);
const url = "https://mernbookstore.herokuapp.com/api/books";

useEffect( ()=> {
const fetchData = async ()=>{
try{
    const res = await fetch(url);
    if(!res.ok){
        throw Error("Could not fetch the data :(");  
    }
    const data = await res.json();
    setBook(data);

    setPending(false);
} catch(err){
    setPending(false);
    setError(err.message);
}
    
}


fetchData()

},[books.length, url]) // eslint-disable-line react-hooks/exhaustive-deps


    return(
        <div className="ShowBookList">
<h2>MERN Book Store</h2>
<Link to= "/create-book" className="add-book-btn">+ Add Book</Link>
<br></br>
<br></br>
{ispending && <div className="loding">Loding...</div>}
{error && <div className="error">{error}</div>}
{ !ispending && !error &&  books.length === 0 ? "There is no book to show": null}
<div className="book-container">
{ books.map((book, k)=>{

    return(<div key={k}>
        <BookCard book = {book}  />
    </div>)
})}
        </div>
        </div>
        
    )

}
export default ShowBookList;