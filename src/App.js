
import {Route, Routes} from 'react-router-dom';

import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import PageNotFound from './components/PageNotFound';


function App() {
  return (
    <div className="App">
<Routes>
  
<Route path = "/" element = {<ShowBookList/>}> </Route> 
<Route path='/create-book' element ={<CreateBook/>}/>

<Route path = "/show-book/:id"  element = {<ShowBookDetails/>}></Route>

<Route path = "/edit-book/:id" element = {<UpdateBookInfo/>}></Route>
<Route path='/*' element = {<PageNotFound/>}></Route>
</Routes>

    </div>
    
  );
}

export default App;
