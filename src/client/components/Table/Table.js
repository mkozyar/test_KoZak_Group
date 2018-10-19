import React from "react";
import up from "./up-arrow.svg";
import down from "./down-arrow.svg";
import openFilter from "./down-chevron.svg";
import closeFilter from "./up-chevron.svg";
import deleteIcon from "./delete.svg";
import edit from "./edit.svg";
import ok from "./ok.svg";
import cancel from "./cancel.svg";
import exit from "./exit.svg";
import SweetAlert from "react-bootstrap-sweetalert";
import InputMask from "react-input-mask";

import "react-datepicker/dist/react-datepicker.css";

import "./Table.css";

export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      showFilter: false,
      sort: {
        sortBy: null,
        sortDir: 1
      },
      filterObj: {},
      editedUser: {
        _id: null,
        fName: null,
        lName: null,
        male: null,
        phoneNumber: null,
        salary: null,
        position: null,
        dateAdded: null
      },
      showModal: false,
      loginForDelete: null
    };
    this.showFilter = this.showFilter.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.sorting = this.sorting.bind(this);
    this.edit = this.edit.bind(this);
    this.editUser = this.editUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.cancel = this.cancel.bind(this);
    this.tableReload = this.tableReload.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    this.tableReload();
  }

  logout(){
    localStorage.removeItem("user")
    this.props.history.push("/login")
  }

  tableReload() {
    let obj = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sortBy: this.state.sort.sortBy,
        sortDir: this.state.sort.sortDir,
        filters: this.state.filterObj
      })
    };

    fetch("/api/table", obj)
      .then(data => data.json())
      .then(data => {
        this.setState({ users: data });
      });
  }

  showFilter(e) {
    e.stopPropagation();
    this.setState({
      showFilter: !this.state.showFilter
    });
  }

  onChangeFilter = async event => {
    let obj = await Object.assign(this.state.filterObj, {
      [event.target.id]: event.target.value
    });
    await this.setState({
      filterObj: obj
    });
    await this.tableReload();
  };

  edit(user) {
    this.setState({ editedUser: user });
  }

  editUser(event) {
    let user = this.state.editedUser;
    user[event.target.id] = event.target.value;
    this.setState({ editedUser: user });
  }
  updateUser() {
    let obj = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: this.state.editedUser
      })
    };

    fetch("/api/table", obj)
      .then(this.setState({ showModal: false }))
      .then(this.setState({ editedUser: {} }))
      .then(this.tableReload());
  }
  deleteUser(login) {
    let obj = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: login
      })
    };

    fetch("/api/table/delete", obj)
      .then(this.setState({ showModal: false }))
      .then(this.tableReload());
  }
  cancel() {
    let editedUser = {
      _id: null,
      fName: null,
      lName: null,
      male: null,
      phoneNumber: null,
      salary: null,
      position: null,
      dateAdded: null
    };
    this.setState({ editedUser: editedUser });
  }

  async sorting(val) {
    let sortObj = await {
      sortBy: val,
      sortDir: -this.state.sort.sortDir
    };
    await this.setState({ sort: sortObj });
    await this.tableReload();
  }

  render() {
    return (
      <div>
        <div className="logout" title="logout">
        <div onClick={this.logout}>Logout</div>
          <img src={exit} alt="exit" />
          
        </div>
        <SweetAlert
          warning
          show={this.state.showModal}
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          onConfirm={() => this.deleteUser(this.state.loginForDelete)}
          onCancel={() => this.setState({ showModal: false })}
        />
        <table>
          <thead>
            <tr>
              <th onClick={() => this.sorting("fName")}>
                <div className="show-filters" onClick={this.showFilter}>
                  {this.state.showFilter ? (
                    <img src={closeFilter} alt={closeFilter} />
                  ) : (
                    <img src={openFilter} alt={openFilter} />
                  )}
                </div>
                First Name
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "fName" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "fName" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th onClick={() => this.sorting("lName")}>
                Last Name
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "lName" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "lName" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th onClick={() => this.sorting("male")}>
                Male
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "male" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "male" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th onClick={() => this.sorting("login")}>
                Login
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "login" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "login" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th onClick={() => this.sorting("email")}>
                Email
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "email" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "email" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th onClick={() => this.sorting("phoneNumber")}>
                Phone Number
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "phoneNumber" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "phoneNumber" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th onClick={() => this.sorting("salary")}>
                Salary
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "salary" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "salary" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th onClick={() => this.sorting("position")}>
                Position
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "position" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "position" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th onClick={() => this.sorting("dateAdded")}>
                Date Added
                <div className="sorting">
                  {this.state.sort.sortDir === 1 &&
                    this.state.sort.sortBy === "dateAdded" && (
                      <img src={up} alt={up} />
                    )}
                  {this.state.sort.sortDir === -1 &&
                    this.state.sort.sortBy === "dateAdded" && (
                      <img src={down} alt={down} />
                    )}
                </div>
              </th>
              <th>Actions</th>
            </tr>
            {this.state.showFilter ? (
              <tr>
                <td>
                  <input
                    type="text"
                    id="fName"
                    onChange={this.onChangeFilter}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="lName"
                    onChange={this.onChangeFilter}
                  />
                </td>
                <td>
                  <select id="male" onChange={this.onChangeFilter}>
                    <option />
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    id="login"
                    onChange={this.onChangeFilter}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="email"
                    onChange={this.onChangeFilter}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="phoneNumber"
                    onChange={this.onChangeFilter}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="salary"
                    onChange={this.onChangeFilter}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="position"
                    onChange={this.onChangeFilter}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="dateAdded"
                    onChange={this.onChangeFilter}
                  />
                </td>
                <td />
              </tr>
            ) : (
              ""
            )}
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user._id}>
                <td>
                  {this.state.editedUser._id === user._id ? (
                    <input
                      id="fName"
                      type="text"
                      value={user.fName}
                      onChange={this.editUser}
                    />
                  ) : (
                    <span>{user.fName}</span>
                  )}
                </td>
                <td>
                  {this.state.editedUser._id === user._id ? (
                    <input
                      type="text"
                      value={user.lName}
                      id="lName"
                      onChange={this.editUser}
                    />
                  ) : (
                    <span>{user.lName}</span>
                  )}
                </td>
                <td>
                  {this.state.editedUser._id === user._id ? (
                    <select
                      value={user.male}
                      id="male"
                      onChange={this.editUser}
                    >
                      <option />
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  ) : (
                    <span>{user.male}</span>
                  )}
                </td>
                <td>{user.login}</td>
                <td>{user.email}</td>
                <td>
                  {this.state.editedUser._id === user._id ? (
                    <InputMask
                      type="text"
                      mask="+99 (999) 999-99-99"
                      value={user.phoneNumber}
                      id="phoneNumber"
                      onChange={this.editUser}
                    />
                  ) : (
                    <span>{user.phoneNumber}</span>
                  )}
                </td>
                <td>
                  {this.state.editedUser._id === user._id ? (
                    <input
                      type="text"
                      value={user.salary}
                      id="salary"
                      onChange={this.editUser}
                    />
                  ) : (
                    <span>{user.salary}</span>
                  )}
                </td>
                <td>
                  {this.state.editedUser._id === user._id ? (
                    <input
                      type="text"
                      value={user.position}
                      id="position"
                      onChange={this.editUser}
                    />
                  ) : (
                    <span>{user.position}</span>
                  )}
                </td>
                <td>
                  {this.state.editedUser._id === user._id ? (
                    <InputMask
                      type="text"
                      mask="9999-99-99"
                      value={user.dateAdded}
                      id="dateAdded"
                      onChange={this.editUser}
                    />
                  ) : (
                    <span>{user.dateAdded.slice(0,10)}</span>
                  )}
                </td>
                <td>
                  {!(this.state.editedUser._id === user._id) ? (
                    <div className="actions">
                      <img
                        src={edit}
                        alt={edit}
                        title="Edit"
                        onClick={() => this.edit(user)}
                      />
                      <img
                        src={deleteIcon}
                        alt={deleteIcon}
                        title="Delete"
                        onClick={() =>
                          this.setState({
                            showModal: true,
                            loginForDelete: user.login
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className="actions">
                      <img
                        src={ok}
                        alt={ok}
                        title="Save"
                        onClick={this.updateUser}
                      />
                      <img
                        src={cancel}
                        alt={cancel}
                        title="Cancel"
                        onClick={this.cancel}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
    );
  }
}
