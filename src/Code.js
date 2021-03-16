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

     renderTableHeader = () => {
          return Object.keys(this.state.users[0]).map(attr => <th key={attr}>
               {attr.toUpperCase()}
               </th>)
        }

     renderTableRows = () => {
          return this.state.users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.avatar}</td>
              </tr>
            )
          })
        }
     
     render ()  {
          const { users } = this.state
          return users
          ? (
               <table>
                    <thead>
                         <tr>
                          {this.renderTableHeader()}
                         </tr>
                    </thead>
                    <tbody>
                      {this.renderTableRows()}
                     </tbody>
               </table>
          ) : (
               <div>
                    No Users
               </div>
          )
     }
}
export default ApiData

