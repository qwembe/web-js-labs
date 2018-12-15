import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    name: "",
    password: "",
    isLoggged: false,
    isAdmin: false
  };
  handleSubmit(e) {
    e.preventDefault();
    const { name, password } = this.state;
    fetch(`http://localhost:3001/?name=${name}&password=${password}`)
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(res =>
        this.setState({
          isAdmin: res.login === "admin",
          isLoggged: true,
          id: res.id
        })
      );
  }
  handleChangeInput(e, name) {
    this.setState({
      [name]: e.target.value
    });
  }
  render() {
    const { name, password, isLoggged, id, isAdmin } = this.state;
    if (isAdmin) return <Redirect push to={`/admin`} />;
    if (isLoggged) return <Redirect push to={`/brokers/${id}`} />;
    return (
      <div class="w3-container w3-yellow w3-margin w3-padding">
        <h2>Покупка и продажа акций</h2>
        <form>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e => this.handleChangeInput(e, "name")}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => this.handleChangeInput(e, "password")}
          />
          <input
            type="submit"
            value="Log in"
            onClick={e => this.handleSubmit(e)}
          />
        </form>
      </div>
    );
  }
}

export default Login;
