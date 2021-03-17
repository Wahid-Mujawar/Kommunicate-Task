import React, { useState } from "react";

const Pagination = () => {
  // Data to be rendered using pagination.
   const todos = [];
   const todosPerPage = 1;
   const [ activePage, setCurrentPage ] = useState( 1 );

   // Logic for displaying current todos
   const indexOfLastTodo  = activePage * todosPerPage;
   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
   const currentTodos     = todos.slice( indexOfFirstTodo, indexOfLastTodo );

   const renderTodos = currentTodos.map( ( todo, index ) => {
      return <li key={ index }>{ todo }</li>;
   } );

   const handlePageChange = ( pageNumber ) => {
      console.log( `active page is ${ pageNumber }` );
      setCurrentPage( pageNumber )
   };

   return (
      <div>
         <div className="result">
            { renderTodos }
         </div>
         <div className="pagination">
            <Pagination
               activePage={ activePage }
               itemsCountPerPage={ 3 }
               totalItemsCount={ todos.length }
               pageRangeDisplayed={ 3 }
               onChange={ handlePageChange }
            />
         </div>
      </div>
   )

}

export default Pagination;