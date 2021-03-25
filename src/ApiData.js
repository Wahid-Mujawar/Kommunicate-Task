import React, { useEffect, useState } from 'react';
import { getUsersByPage } from './service'
import Modal from './Modal'

const ApiData = () => {
     const [users, setUser] = useState([])
     var [initialPage, sePage] = useState(1)
     var [totalpages, setTotalPages] = useState(1)
     var [lastpage, setLastpage] = useState(1)
     const [searchTerm, setSearchTerm] = React.useState("");
     const [isModalOpen, toggleModal] = useState(false);
     const [modaluser, setmodaluser] = useState({});

     const handleChange = e => {
     setSearchTerm(e.target.value);
     };
 
     useEffect(() => {
          const fetchUsers = async (initialPage) => {
               const data = await getUsersByPage(initialPage)
               setUser(data.data)
               setLastpage(data.total_pages)
        };    
        fetchUsers()
     }, []);

     useEffect(() => {
          const results = users.filter(person =>
               person.first_name.toLowerCase().includes(searchTerm) ||
               person.last_name.toLowerCase().includes(searchTerm) ||
               person.email.toLowerCase().includes(searchTerm)
          );
               setUser(results);
               },[searchTerm]);
                    
     const IncPage = async ()=>{
          sePage(initialPage + 1)
          initialPage += 1
          const data = await getUsersByPage(initialPage)
               setTotalPages(data.page)
               setUser(data.data)
     }

     const DecPage = async ()=>{
          sePage(initialPage - 1)
          initialPage -= 1
          const data = await getUsersByPage(initialPage)
          setUser(data.data)
          setTotalPages(data.page)
     }

     const singleUser = async (user)=>{
          console.log(user);
          setmodaluser(user)
     
     }
     
     const realError = console.error;
     console.error = (...x) => {
          // console.log(x)
     // debugger;
     if (x[0] ===  "Warning: The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.%s") {
          return;
      }
          realError(...x);
     };

     return users
          ? (
               
               <React.Fragment>
                    <div>
                         <input type="text" id="myInput" value={searchTerm}
                          onChange={handleChange} placeholder="Search for names.." title="Type in a name"></input>
                    </div>
                    
                     <table id="containers">
                         <thead>
                              <tr>
                                   <th>Avatar</th>
                                   <th>Id</th>
                                   <th>Email</th>
                                   <th>First Name</th>
                                   <th>Last Name</th>
                              </tr>
                         </thead>

                    <tbody>
                    {
                         users.map((user) => ( 

                              <tr key={user.id}>
                                   <td onClick={() => { toggleModal(!isModalOpen); singleUser(user);}}><img src={user.avatar}  alt="" width="60" height="60"/></td>
                                   <td>{user.id}</td>
                                   <td>{user.email}</td>
                                   <td>{user.first_name}</td>
                                   <td>{user.last_name}</td>
                              </tr>
                         ))
                    }
                    </tbody>
                    </table>
                    
                    <div className="center">
                    <div className="pagination">
                         <button type="button" href="#" onClick={() => DecPage()} disabled={initialPage === 1 }>Previous</button>
                         <button type="button" href="#" onClick={() => IncPage()} disabled={totalpages >= 3}>Next </button>
                         <h5>Page {totalpages} of {lastpage}</h5>
                    </div>
               </div>

                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                        
                         <div className='info'><h3>User Info</h3></div>
                         <br/>
                         <div className="wrapper">
                         <div><img src={modaluser.avatar}  alt="" width="120" height="120"/>
                         </div>

                         <div className="details">
                         <div className='id'>
                              <div>Id : {modaluser.id}</div>
                         </div>
                         <br/>
                          <div className="mail">
                              <div>Email  : {modaluser.email}</div>
                              </div>
                              <br/>

                              <div className="first">
                              <div>First Name : {modaluser.first_name}</div>
                              <div></div>
                              </div>
                              <br/>

                              <div className="last">
                              <div><div>Last Name : {modaluser.last_name}</div></div>
                              </div>
                              </div>
                              
                         </div>
                         
                         <variant className="close" onClick={() => toggleModal(false)}/>
               </Modal>
               </React.Fragment>
          ) : (
               <div>    
               </div>
          )
}

export default ApiData



