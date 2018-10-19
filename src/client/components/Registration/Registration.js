import React, { Component } from "react";
import { Link } from "react-router-dom";
import cryptojs from "crypto-js";
import "./Registration.css";
import InputMask from "react-input-mask";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      confirmPass: "",
      email: "",
      fName: "",
        lName: "",
        male: "",
        phoneNumber: "",
        salary: "",
        position: "",
        dateAdded: "",
    };
    this.handChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  validateForm() {
    return (
      this.state.login.length > 0 &&
      this.state.password.length > 0 &&
      this.state.confirmPass === this.state.password &&
      /\S+@\S/.test(String(this.state.email).toLowerCase())
    );
  }
  comparePass() {
    return this.state.password === this.state.confirmPass;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  register = () => {
    let hashedPass = cryptojs.HmacSHA1(this.state.password, 'superSecret').toString()
    let obj = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: this.state.login,
        email: this.state.email,
        fName: this.state.fName,
        lName: this.state.lName,
        male: this.state.male,
        phoneNumber: this.state.phoneNumber,
        salary: this.state.salary,
        position: this.state.position,
        dateAdded: this.state.dateAdded,
        password: hashedPass
      })
    };
    fetch("/api/registration", obj)
      .then(function(res) {
        if(!res.ok){
          throw Error(res.statusText)
        }
        return res
     
      }).then(function (res) {
        console.log("Resistration OK!");
       this.props.history.push("/login")
      }.bind(this))
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth_tabs">
          <div className="sign-tab">
            <Link to="/login">sign in</Link>
          </div>
          <div className="sign-tab active">
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
            type="text"
            id="email"
            placeholder="EMAIL"
            onChange={this.handleChange}
          />
          
           <input
            type="text"
            id="fName"
            placeholder="FIRST NAME"
            onChange={this.handleChange}
          />
           <input
            type="text"
            id="lName"
            placeholder="LAST NAME"
            onChange={this.handleChange}
          />
           <InputMask
            type="text"
            id="phoneNumber"
            mask="+99 (999) 999-99-99"
            placeholder="PHONE NUMBER"
            onChange={this.handleChange}
          />
           <input
            type="text"
            id="salary"
            placeholder="SALARY"
            onChange={this.handleChange}
          />
           <input
            type="text"
            id="position"
            placeholder="POSITION"
            onChange={this.handleChange}
          />
           <InputMask
            type="text"
            id="dateAdded"
            mask="9999-99-99"
            placeholder="DATE ADDED"
            onChange={this.handleChange}
          />
           <select  id="male" placeholder="DATE ADDED" onChange={this.handleChange} >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
          <input
            type="password"
            id="password"
            placeholder="PASSWORD"
            onChange={this.handleChange}
          />
          <input
            type="password"
            id="confirmPass"
            className={this.comparePass() ? "" : "wrong"}
            placeholder="CONFIRM PASSWORD"
            onChange={this.handleChange}
          /> 
          <button disabled={!this.validateForm()} onClick={this.register}>
            REGISTER
          </button>
        </div>
      </div>
    );
  }
}


export default Registration