import React, { useEffect, useState } from 'react';
import { getUsersByPage } from './service'
import Modal from './Modal';

const ApiData = () => {
     const [users, setUser] = useState([])
     var [initialPage, sePage] = useState(1)
     var [totalpages, setTotalPages] = useState(1)
     var [lastpage, setLastpage] = useState(1)
     const [searchTerm, setSearchTerm] = React.useState("");
     const [isModalOpen, toggleModal] = useState(false);
     const [modaluser, setmodaluser] = useState({});
  
   

     const handleChange = e => {
          console.log("e.target.value--",e.target.value)
     setSearchTerm(e.target.value);
     };
 
     useEffect(() => {
          console.log("callling useEffect")
          const fetchUsers = async (initialPage) => {
               const data = await getUsersByPage(initialPage)
               console.log("data---------", data.data)
               totalpages = (data.total / data.per_page)
               console.log("temptotal",totalpages)
               setUser(data.data)
               setLastpage(data.total_pages)
        };    
        fetchUsers()
     }, [])

     useEffect(() => {
          const results = users.filter(person =>
               person.first_name.toLowerCase().includes(searchTerm)
          );
               console.log("results",results)
               setUser(results);
               }, [searchTerm]);

     console.log("------------------------------------------initialPage", initialPage)
     
     const IncPage = async ()=>{
          console.log("initialPage 111", initialPage);
          sePage(initialPage + 1)
          initialPage += 1
          console.log("initialPage 2222", initialPage, typeof (initialPage));
          
          const data = await getUsersByPage(initialPage)
          console.log("data----222222222222-----", data.data)
               setTotalPages(data.page)
               setUser(data.data)
     }
     const DecPage = async ()=>{
          console.log("DecPage 00", initialPage);
          sePage(initialPage - 1)
          initialPage -= 1
          console.log("DecPage 2222", initialPage,typeof(initialPage));
          const data = await getUsersByPage(initialPage)
               console.log("data----222222222222-----",data.data)
          setUser(data.data)
          setTotalPages(data.page)
     }

     const singleUser = async (user)=>{
          console.log("user 00", user);
          setmodaluser(user)
     
     }
     
     return users
          ? (
               
               <React.Fragment>
                    <div>
                          <input type="text" id="myInput" value={searchTerm}
        onChange={handleChange} placeholder="Search for names.." title="Type in a name"></input>
                   </div>
                     <table id="containers">
                         <thead>
                              <th>Avatar</th>
                         <th>Id</th>
                         <th>Email</th>
                         <th>First Name</th>
                         <th>Last Name</th>
                         
                     </thead>
                     
                    <tbody>
                    {
                         users.map((user) => (
                              <tr>
                                   <td onClick={() => { toggleModal(!isModalOpen); singleUser(user);}}><img src={user.avatar}  alt="" width="60" height="60"/></td>
                                   <td><center>{user.id}</center></td>
                                   <td>{user.email}</td>
                                   <td>{user.first_name}</td>
                                   <td>{user.last_name}</td>
                                   
                              </tr>
                         
                         ))
                    }

                    </tbody>
                    </table>
                    
               <div class="center">
                    <div class="pagination">
                      <button type="button" href="#" onClick={() => DecPage()} disabled={initialPage ==1 }>Previous</button>
                      <button type="button" href="#" onClick={() => IncPage()} disabled={totalpages >= 3}>Next </button>
                      
                      <h5>Page {totalpages} of {lastpage}</h5>
                    </div>
               </div>

                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                        
                         <div class='info'><h3>User Info</h3></div>
                         <div class="wrapper">
                         <div><img src={modaluser.avatar}  alt="" width="150" height="150"/></div>

                         <div class="details">

                          <div class="mail">
                              <div>Email  : {modaluser.email}</div>
                              </div>
                              <br/>

                              <div class="first">
                              <div>First Name : {modaluser.first_name}</div>
                              <div></div>
                              </div>
                              <br/>

                              <div class="last">
                              <div><div>Last Name : {modaluser.last_name}</div></div>
                              </div>
                              </div>
                              
                         </div>
                    
                         <button class="close" onClick={() => toggleModal(prev=>!prev)}/>
               </Modal>
               </React.Fragment>
               
               
                    
               
          ) : (
               <div>
                    
               </div>
          )

}



export default ApiData



