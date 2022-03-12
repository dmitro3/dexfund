import React from "react";

// import Paper from "@material-ui/core/Paper";
// import {
//   Chart,
//   ArgumentAxis,
//   // ValueAxis,
//   LineSeries,
//   // Title,
//   // Legend,
// } from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
// // import Typography from '@material-ui/core/Typography';
// import { ArgumentScale, Animation } from "@devexpress/dx-react-chart";
// import { curveCatmullRom } from "d3-shape";
// import { scalePoint } from "d3-scale";

// import { energyConsumption as data } from "./demo-data/data-vizualization";

// COMPONENTS
// ...

// ASSETS
import graph from "../assets/graph.svg";
// import graphLoading from "../assets/graph_loading_mask.svg";
import logoSPinning from "../assets/loading_spinning.gif";
// CSS

// rechart
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import ContentLoader from "react-content-loader";

import "../styles/portfolio.css";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import { getEthPrice } from "../../../../../../ethereum/funds/fund-related";

const demoStyles = () => ({
  chart: {
    paddingRight: "30px",
    height: "100%",
    width: "100%",
  },
});

class ChartComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ethPrice: this.props.ethPrice,
      data: this.props.data,
      loading: this.props.loading,
      noData: this.props.noData,
    };
  }

  componentDidUpdate() {
    var newStateData = {};
    var updating = false;
    if (this.state.data != this.props.data) {
      // this.setState({ data: this.props.data });
      newStateData = {
        data: this.props.data,
      };
      updating = true;
    }

    if (this.state.loading != this.props.loading) {
      // this.setState({ loading: this.props.loading });
      newStateData = {
        ...newStateData,
        loading: this.props.loading,
      };
      updating = true;
    }

    if (this.state.noData != this.props.noData) {
      // this.setState({ noData: this.props.noData })
      newStateData = {
        ...newStateData,
        noData: this.props.noData,
      };
      updating = true;
    }

    if (updating)
      this.setState({
        ...newStateData,
      });
  }

  renderNoData() {
    return (
      <>
        <div className="w-no-data-chart-wrapper">
          <div className="w-no-data-chart-content">
            <img
              src={graph}
              alt="no-data-graph"
              className="w-no-data-chart-img"
            />
            <div className="w-no-data-chart-info">
              No data available for this time period
            </div>
          </div>
        </div>
      </>
    );
  }

  renderLoading() {
    return (
      <>
        <div className="w-no-data-chart-wrapper">
          <div className="w-no-data-chart-content">
            <img
              src={logoSPinning}
              alt="no-data-graph"
              className="w-loading-chart-img"
            />
          </div>
        </div>
      </>
    );
  }

  renderChart() {
    // const { data: chartData } = this.state;
    const { classes } = this.props;
    const {height} = this.props;
    const values = this.state.data;
    const times = values.times.map(t => parseInt(t) * 1000);
    // const ethPrice = parseFloat(this.state.ethPrice);
    const priceValues = values.holdingHistory;
    const maxValue = Math.max(...priceValues);

    const fundName = this.state.fundName
    const series = [{
      name: fundName,
      data: priceValues
    }];

    const options =  {
        chart: {
            height: height || 400,
            type: 'area'
        },
        colors:['#CA6BE5'],
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            borderColor: '#eee',
            strokeDashArray: 7,
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: times
        },
        yaxis: {
            type: 'numeric',
            labels: {
                formatter: function (value) {
                  return value.toFixed(2);
                }
            },
            min: 0,
            max: parseFloat((maxValue + maxValue/10).toFixed(2))
        },
    };

    return (
      <ReactApexChart options={options} series={series} type="area" height={height || 400} width={'100%'} />
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if (this.state.noData) {
      return this.renderNoData();
    } else {
      return this.renderChart();
    }
  }
}

export default withStyles(demoStyles, { timestamp: "Chart1D" })(ChartComponent);
