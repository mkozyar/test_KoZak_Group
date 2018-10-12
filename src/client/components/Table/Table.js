import React from "react";
import up from "./up-arrow.svg";
import down from "./down-arrow.svg";
import openFilter from "./down-chevron.svg";
import closeFilter from "./up-chevron.svg";

import "./Table.css";

export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      showFilter: false,
      lnSort: null,
      fnSort: null,
      maleSort: null,
    };
    this.showFilter = this.showFilter.bind(this);
  }

  showFilter(e) {
     e.stopPropagation()
    this.setState({
      showFilter: !this.state.showFilter
    });
  }
  
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th onClick={()=>{this.setState({fnSort: !this.state.fnSort})}}>
              <div className="show-filters" onClick={this.showFilter}>
                {this.state.showFilter ? (
                  <img src={closeFilter} alt={closeFilter} />
                ) : (
                  <img src={openFilter} alt={openFilter} />
                )}
              </div>
              First Name
              <div className="sorting">
                {this.state.fnSort && <img src={up} alt={up} />} {this.state.fnSort==false && <img src={down} alt={down} />}
              </div>
            </th>
            <th onClick={()=>{this.setState({lnSort: !this.state.lnSort})}}>
              Last Name
              <div className="sorting">
                {this.state.lnSort && <img src={up} alt={up} />} {this.state.lnSort==false && <img src={down} alt={down} />}
              </div>
            </th>
            <th onClick={()=>{this.setState({maleSort: !this.state.maleSort})}}>
              Male
              <div className="sorting">
                {this.state.maleSort && <img src={up} alt={up} />} {this.state.maleSort==false && <img src={down} alt={down} />}
              </div>
            </th>
            <th>Login</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Salary</th>
            <th>Position</th>
            <th>Date Added</th>
            <th>
              Actions{" "}
              <div className="sorting">
                <img src={up} alt={up} /> <img src={down} alt={down} />
              </div>
            </th>
          </tr>
          {this.state.showFilter ? (
            <tr>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td>
                <input type="text" />
              </td>
              <td />
            </tr>
          ) : (
            ""
          )}
        </thead>
        <tbody>
          <tr>
            <td>Gitsome</td>
            <td>Some one</td>
            <td>Take mose</td>
            <td>Likbes</td>
            <td>Racounter</td>
            <td>Racounter</td>
            <td>Racounter</td>
            <td>Racounter</td>
            <td>Racounter</td>
          </tr>
          <tr>
            <td>Linkage</td>
            <td>Fordor</td>
            <td>Miad ron me</td>
            <td>Diablo core</td>
            <td>Tidbade</td>
            <td>Tidbade</td>
            <td>Tidbade</td>
            <td>Tidbade</td>
            <td>Tidbade</td>
          </tr>
          <tr>
            <td>Hicura</td>
            <td>Warecom</td>
            <td>Xamicon</td>
            <td>Yamama</td>
            <td>Udoricano</td>
          </tr>
          <tr>
            <td>Lavistaro</td>
            <td>Micanorta</td>
            <td>Ebloconte ma</td>
            <td>Quad ri port</td>
            <td>Timesquer</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
