import React, { Component } from 'react';
import axios from 'axios';

/* Normally you place configuration and url's like this somewhere else, not for this basic example */
const baseURL = 'https://jsonplaceholder.typicode.com';
const endpoints = {
  users: `${baseURL}/users`,
};
const axiosConfig = {
  headers: {
    Accept: 'application/json',
  },
}


class JSONPlaceholderComponentDing extends Component {

  /**
   * Mounting lifecycle, called first. This function always exists
   * in JavaScript classes (in other languages aswell). When you extend
   * your class, you have to call the super() function first to
   * initialize the superclass (React.Component in this case). Only do that
   * if you're actually using the constructor function (in JS).
   *
   * You can define the React state in here.
   *
   * @return  {void}  This function returns nothing
   */
  constructor() {
    super();

    this.state = {
      users: [], // Default state for the users array
    };
  }


  /**
   * Mounting lifecycle, called after the constructor. In this function
   * we want to asynchronously fetch the users from the API, so they
   * are received a few moments later. When the users are received, the
   * component has probably been rendered once. If the users are fetched
   * successfully, the state is updated with the new users, and an updated
   * state triggers the component to be re-rendered. This is when you use
   * the users from the state of the application to show something else.
   *
   * @return  {void}  This function returns nothing
   */
  componentWillMount() { // Called after constructor(), before render()
    axios.get(endpoints.users, axiosConfig)
    .then(response => this.setState({ users: response.data }))
    .catch(error => console.log('error: ', error));
  }


  /**
   * Custom function to show a list of users based on the data that is
   * fetched from the placeholder API.
   *
   * @return {JSX.Element}  An unordered list with simple list items.
   */
  showUserList() {
    const { users } = this.state;

    const listItems = users.map((user) => (
      <li key={user.id}>{user.name} ({user.email})</li>
    ));

    return <ul>{listItems}</ul>
  }


  /**
   * Mounting and updating lifecycle. Called after componentWillMount()
   * and before componentDidMount(). This function is also called whenever
   * the state of this component changes or when this component receives
   * new props.
   *
   * @return {JSX.Element}  Returns a JSX Element that represent the HTML.
   */
  render() {
    return (
      <section id='JSONPlaceholderComponentDing'>
        {this.state.users.length > 0 ? this.showUserList() : <div>Eem wach'n</div>}
      </section>
    )
  }
}

export default JSONPlaceholderComponentDing;
