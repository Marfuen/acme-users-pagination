import React, {Component} from 'react';
import axios from 'axios';

class Users extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      count: [],
    }
    this.fetchAllUsers = this.fetchAllUsers.bind(this);
  }
  fetchAllUsers(){
    axios.get('https://acme-users-api.herokuapp.com/api/users/')
      .then(res => res.data)
      .then(({users, count}) => this.setState({
        users,
        count,
      }))
      .catch(e => console.log(e));
  }
  fetchPage(idx){
    axios.get(`https://acme-users-api.herokuapp.com/api/users/${idx}`)
      .then(res => res.data)
      .then(({users, count}) => this.setState({
        users,
        count,
      }))
      .catch(e => console.log(e));
  }
  componentDidMount(){
    if(this.props.idx){
      this.fetchPage(this.props.idx);
    } else {
      this.fetchAllUsers();
    }
  }
  componentDidUpdate(prevState){
    if(this.props.idx && (this.props.idx !== prevState.idx)){
      this.fetchPage(this.props.idx)
    }
  }
  render() {
    const {users, count} = this.state;
    const {idx, history} = this.props;
    return (
      <div>
        <p>{count} Results. Page {!idx ? 1 : Number(idx) + 1} of {Math.ceil(count/50)}</p>
        <div className="btn-group">
          <button type="submit" className="btn btn-info" onClick={() => {
            if(Number(idx) > 0){
              history.push('/users/0');
            }
          }} disabled={Number(idx) === 0 || !idx}>First</button>
          <button type="submit" className="btn btn-info" onClick={() => {
            if(Number(idx) > 0){
              history.push(`/users/${Number(idx) - 1}`)
            }
          }} disabled={Number(idx) === 0 || !idx}>Prev</button>
          <button type="submit" className="btn btn-primary">{!idx ? 1 : Number(idx) + 1}</button>
          <button type="submit" className="btn btn-info" onClick={() => {
            if(!idx){
              history.push('/users/1');
            } else {
              history.push(`/users/${Number(idx) + 1}`)
            }
          }} disabled={Number(idx) === (Math.ceil(count/50) -1)}>Next</button>
          <button type="submit" className="btn btn-info" onClick={() => {
            if(idx < Math.ceil(count/50)){
              history.push(`/users/${Math.ceil(count/50) - 1}`)
            }
          }} disabled={Number(idx) === (Math.ceil(count/50) -1)}>Last</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Email</th>
              <th scope="col">Title</th>
            </tr>
          </thead>
          <tbody>

            {users.map(user =>
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.middleName}</td>
                <td>{user.email}</td>
                <td>{user.title}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
};

export default Users;
