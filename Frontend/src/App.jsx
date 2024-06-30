import React from 'react';
import Home from './Home';
import News from './News';
import { Routes,Route,BrowserRouter} from 'react-router-dom';
import Bookmarks from './Bookmarks';

function App() {

  return(  <>
          <BrowserRouter>
           <Routes>
            <Route path='/'  element={<Home/>} />
            <Route path="/notes" element={<Bookmarks/>} />
            <Route path="/detail" element={<News/>} />
           </Routes>
          </BrowserRouter>
    </>
  );
}

export default App;
