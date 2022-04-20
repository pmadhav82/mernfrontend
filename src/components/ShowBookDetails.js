import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ShowBookDetails = () =>{

const {id} = useParams();
const url = `http://mernbookstore.herokuapp.com/api/books/${id}`;

const navitage = useNavigate();

const [ message, setMessage]= useState(null);
const [isLoding, setIsLoding] = useState(true)
const [deletbox, setDeletebox]= useState(false)

const [book , setBook]= useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_data: "",
    publisher: ""
})

const deleteHandeler = async()=>{
try{
const res =  await fetch(url,{
    method:"DELETE"
})
if(res.status>=200 && res.status < 300){
navitage("/");
}else{
    throw Error("Something went wrong..")
} } catch(err){
    alert(err.message);
}
    setDeletebox(false)
}
useEffect(()=>{
    const fetchData = async ()=>{

try{
    setIsLoding(false);
    const res = await fetch(url);
    if(res.status >=200 && res.status < 300 ){
const data = await res.json();
setBook(data);

    }else{
        throw Error("Something went wrong, try again latter.")
    }

}catch(err){
setMessage(err.message);
}

    }

    fetchData();

}, [url]) // eslint-disable-line react-hooks/exhaustive-deps


return(
    <div className="showbookdetails">
  <Link  className="show-book-btn" to= "/">Show Book List</Link>

  {isLoding && <div className="loding">Loding...</div>}
{message && <div className="error"> {message}</div>}

{!message && <div className="book-info">
<h2>Book Info</h2>


<table>
    <tbody>

    <tr>
        <th>Title</th>
 <td>{book.title}</td>
    </tr>
    <tr>
        <th>
            Author
        </th>
        <td>
            {book.author}
        </td>
        </tr>


        <tr>
        <th>ISBN</th>
 <td>{book.isbn}</td>
    </tr>

    <tr>
        <th>Publisher</th>
 <td>{book.publisher}</td>
    </tr>

    <tr>
        <th>Published Data</th>
 <td>{book.published_data}</td>
    </tr>

    <tr>
        <th>Description</th>
 <td>{book.description}</td>
    </tr>



    </tbody>
</table>
<div className="action-btn">
    
<button onClick={()=>{
setDeletebox(true)
}}>Delete Book</button>
<Link to={`/edit-book/${book._id}`}>Edit Book</Link>
</div>
</div>
 }
 {deletbox && <div className="deleteBox">
     <h2>Do you want to delete this book?</h2>
     <button onClick={deleteHandeler}>Delete</button>
     <button onClick={()=>{
         setDeletebox(false)
     }}>Cancle</button>
     </div>}
    </div>
)

}

export default ShowBookDetails;