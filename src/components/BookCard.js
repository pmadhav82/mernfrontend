import { Link } from "react-router-dom";



const BookCard = ({book})=>{

return(
<div className="book-card">
    <h2>
        <Link to = {`/show-book/${book._id}`}>
            {book.title}
        </Link>
    </h2>
      
    <h3>
        {book.author}
    </h3>
    <p>{book.description}</p>
    
</div>

)

}

export default BookCard;