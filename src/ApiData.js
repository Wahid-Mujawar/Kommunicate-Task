import React, { Component } from 'react';
class ApiData extends Component {
     constructor(props){
          super(props);
          this.state = {
               users:null
          }
     }
     componentDidMount() {
          fetch('https://reqres.in/api/users')
          .then((res) => { res.json()
               .then((result) => {
                 this.setState({users:result.data})
                 console.log(result.data)
               })
          })
     }
          render ()  {
          const { users } = this.state;
          
          return users
          ? (
               
               <table id="containers">
                    <thead>
                         <th>Id</th>
                         <th>Email</th>
                         <th>First Name</th>
                         <th>Last Name</th>
                         <th>Avatar</th>

                     </thead>
                     
               <tbody>
                  {
                    this.state.users.map((user) => (
                          <tr>
                              <td><center>{user.id}</center></td>
                              <td>{user.email}</td>
                              <td>{user.first_name}</td>
                              <td>{user.last_name}</td>
                              <td><img src="{user.avatar}" alt="" width="60" height="60"/></td>
                          </tr>
                      
                    ))
                  }

               </tbody>
           </table>
               
          ) : (
               <div>
                    
               </div>
          )
          
     }
     
}


export default ApiData



