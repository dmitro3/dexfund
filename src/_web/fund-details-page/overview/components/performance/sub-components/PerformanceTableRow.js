// import { TimerSharp } from '@material-ui/icons';
import React, { Component } from "react";

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import "../../../styles/fundOverview.css";

class PerformanceTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1: "-", // january
      data2: "-", // february
      data3: "-", // march
      data4: "-", // april
      data5: "-", // may
      data6: "na%", // june
      data7: "na%", // july
      data8: "na%", // august
      data9: "-", // september
      data10: "-", // october
      data11: "-", // november
      data12: "-", // december
    };
  }

  render() {
    return (
      <>
        <div className="w-fund-performance-table-row">
          <div className="w-fund-performance-table-row-cell year">2021</div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data1}
          </div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data2}
          </div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data3}
          </div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data4}
          </div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data5}
          </div>
          <div
            className="w-fund-performance-table-row-cell month"
            style={{ color: "#FD0000" }}
          >
            {this.state.data6}
          </div>
          <div
            className="w-fund-performance-table-row-cell month"
            style={{ color: "#00AF00" }}
          >
            {this.state.data7}
          </div>
          <div
            className="w-fund-performance-table-row-cell month"
            style={{ color: "#00AF00" }}
          >
            {this.state.data8}
          </div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data9}
          </div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data10}
          </div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data11}
          </div>
          <div className="w-fund-performance-table-row-cell month">
            {this.state.data12}
          </div>
        </div>
      </>
    );
  }
}

export default PerformanceTableRow;
