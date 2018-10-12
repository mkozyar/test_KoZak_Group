import React, { Component } from "react";
import { Link } from "react-router-dom";
import cryptojs from "crypto-js";


import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };
    this.handChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  validateForm() {
    return this.state.login.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({      
      [event.target.id]: event.target.value
    });
  };
  login = async ()=>{
    let hashedPass = cryptojs.HmacSHA1(this.state.password, 'superSecret').toString()
    await this.setState({password: hashedPass})
    let obj = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: this.state.login,
        password: hashedPass
      })
    };
    fetch("/api/login", obj)
      .then(function(res) {
        if(!res.ok){
          throw Error(res.statusText)
        }
        return res
     
      }).then(function (res) {
       this.props.history.push("/table")
      }.bind(this))
      .catch(function(err) {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="auth-container">
        <div className="auth_tabs">
          <div className="sign-tab active">
            <Link to="/login">sign in</Link>
          </div>
          <div className="sign-tab">
            <Link to="/registration">sign up</Link>
          </div>
        </div>
        <div className="login-form">
          <input
            type="text"
            id="login"
            placeholder="LOGIN"
            onChange={this.handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="PASSWORD"
            onChange={this.handleChange}
          />
          <button disabled={!this.validateForm()} onClick={this.login}>LOGIN</button>
        </div>
      </div>
    );
  }
}

export default Login;
