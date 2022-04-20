import { useEffect, useState } from "react";
import { useNavigate, useParams, Link} from "react-router-dom";

const  UpdateBookInfo = ()=>{
    const navitage = useNavigate();
const {id} = useParams();
const url = `http://mernbookstore.herokuapp.com/api/books/${id}`;
const [book, setBook]= useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_data: "",
    publisher: ""
});
const [isLoding , setIsLoding]= useState(true);
const [message, setMessage]= useState(null);

useEffect(()=>{
    const fetchData = async ()=>{
try{
    const res = await fetch(url);
    if(res.status >= 200 &&  res.status <300){
const data = await res.json();
setBook(data);
    }else{
        throw  Error("Something went wrong.")
    }

} catch(err){
    console.log(err)
} finally{
    setIsLoding(false);
}
    }
    fetchData()

}, [url])

const onChange = (e)=>{
    setBook({...book, [e.target.name]:e.target.value})
}

 const onSubmit =  async (e)=>{
    e.preventDefault();
    if(book.title&&book.isbn&&book.author&&book.description&&book.published_data&&book.publisher !==""){
try{
const res = await fetch(url,{
    method:"PATCH",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(book)
})
console.log(res);
if(res.status>=200 && res.status <300){
    navitage("/")
    setBook(null);
    
} else{
    throw Error("Something went wrong, please try again latter.")
}
}catch(err){
    setMessage(err.message)
}
    }else{
        setMessage("All fields are required to fill")
    }
}


return(
    <div>
        {isLoding && <div className="loading"> Loding...</div>}
        {message && <div className="error">{message}</div>}
        {!isLoding &&   <div className="create-book">
            <h2> Edit Book </h2>
            <Link  className="show-book-btn" to= "/">Show Book List</Link>
            <form className="form">
                <input type='text' name="title" value={book.title}
                    onChange={onChange} placeholder="Title of the Book"></input>

<input type='text' name="isbn" value={book.isbn}
                    onChange={onChange} placeholder="ISBN"></input>

<input type='text' name="author" value={book.author}
                    onChange={onChange} placeholder="Author"></input>

<input type='text' name="description" value={book.description}
                    onChange={onChange} placeholder="Describe this book"></input>

<input type='date' name="published_data" value={book.published_data}
                    onChange={onChange} placeholder="Published data"></input>


<input type='text' name="publisher" value={book.publisher}
                    onChange={onChange} placeholder="Publisher of this book"></input>

                <button className="full-width" type="submit" onClick={onSubmit}>Edit Book</button>
            </form>
        </div>}

    </div>
)
}
export default UpdateBookInfo;