import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


const CreateBook = () => {
    const [message, setMessage]= useState(null)

    const url = "https://mernbookstore.herokuapp.com/api/books";
    const navitage = useNavigate();

    const [book, setBook] = useState({
        title: "",
        isbn: "",
        author: "",
        description: "",
        published_data: "",
        publisher: ""
    })


    const onChange = e => {
        const { name, value } = e.target;
        
        setBook({ ...book, [name]: value });
    }



    const  onSubmit =  async e => {
        e.preventDefault();
        if(book.title&&book.isbn&&book.author&&book.description&&book.published_data&&book.publisher !==""){
try{


      const res =   await fetch(url,{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
        if(res.status >=200 && res.status<300){

setBook({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_data: "",
    publisher: ""
})
navitage("/")
        }else{
            throw Error("Something went wrong, failed to add a new book.")
        }
    } catch(err){
setMessage(err.message);
    }
            
        }else{
           setMessage("All fields are required to fill")
        }
    
    }


    return (
        <div className="create-book">
            <h2>Add a New Book</h2>
            <Link  className="show-book-btn" to= "/">Show Book List</Link>
{message && <div className="error">{message}</div>}
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

                <button className="full-width" type="submit" onClick={onSubmit}>Add Book</button>
            </form>
        </div>
    )

}
export default CreateBook