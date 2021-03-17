import React from 'react';
import ApiData from './Code';
import './Style.css'
import Pagination from './Pagination';


function App() {
  return (
    <div className="App">
      <ApiData/>
      <Pagination/>
    </div>
  );
}

export default App;
