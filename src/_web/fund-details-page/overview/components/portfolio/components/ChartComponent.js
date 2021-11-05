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
import { ReactSVG } from 'react-svg'
import graph from '../assets/graph.svg';
import graphLoading from '../assets/graph_loading_mask.svg';
import logoSPinning from '../assets/loading_spinning.gif';
// CSS

// rechart
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

import ContentLoader from "react-content-loader";

import "../styles/portfolio.css";

// const Line = (props) => (
//   <LineSeries.Path
//     {...props}
//     path={line()
//       .x(({ arg }) => arg)
//       .y(({ val }) => val)
//       .curve(curveCatmullRom)}
//   />
// );
const demoStyles = () => ({
  chart: {
    paddingRight: "30px",
    height: "100%",
    width: "100%"
  },
});

class ChartComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      loading: this.props.loading,
      noData: this.props.noData
    };
  }

  componentDidUpdate() {
    var newStateData = {};
    var updating = false;
    if (this.state.data != this.props.data) {
      // this.setState({ data: this.props.data });
      newStateData = {
        data: this.props.data
      }
      updating = true;
    }

    if (this.state.loading != this.props.loading) {
      // this.setState({ loading: this.props.loading });
      newStateData = {
        ...newStateData,
        loading: this.props.loading
      }
      updating = true;
    }

    if (this.state.noData != this.props.noData) {
      // this.setState({ noData: this.props.noData })
      newStateData = {
        ...newStateData,
        noData: this.props.noData
      }
      updating = true;
    }

    if (updating)
      this.setState({
        ...newStateData
      })
  }

  renderNoData() {
    return (

      <>
        <div className="w-no-data-chart-wrapper">
          <div className="w-no-data-chart-content">
            <img 
              src={graph}
              alt='no-data-graph'
              className="w-no-data-chart-img"
            />
            <div className="w-no-data-chart-info">
              No data available for this time period
            </div>
          </div>
        </div>
      </>
    )
  }

  renderLoading() {
    return (

      <>
        <div className="w-no-data-chart-wrapper">
          <div className="w-no-data-chart-content">
            <img 
              src={logoSPinning}
              alt='no-data-graph'
              className="w-loading-chart-img"
            />
          </div>
        </div>
      </>
    );
  }

  renderChart() {
    const { data: chartData } = this.state;
    const { classes } = this.props;

    console.log("DATA IN CHART: "+JSON.stringify(chartData))

    return (
      // <Paper>
      //   <Chart data={chartData} className={classes.chart}>
      //     <ArgumentScale factory={scalePoint} />
      //     <ArgumentAxis />
      //     <LineSeries
      //       name="Performance Chart1D"
      //       valueField="sharePrice"
      //       argumentField="timestamp"
      //       seriesComponent={Line}
      //       color="#F135AE"
      //     />
      //     <Animation />
      //   </Chart>
      // </Paper>
      <ResponsiveContainer padding={{top: "10%"}} width="100%" height={400} className={classes.chart}>
        <AreaChart data={chartData}>
        <defs>
    			<linearGradient id="colorSharePrice" x1="0" y1="0" x2="0" y2="1">
      				<stop offset="0%" stopColor="#FF4D86" stopOpacity={0.1}/>
      				<stop offset="100%" stopColor="#E926C3" stopOpacity={0}/>
    			</linearGradient>
 			  </defs>
          <Area type="monotone" fillOpacity={1} fill="url(#colorSharePrice)" dot={false} dataKey="sharePrice" stroke="#F135AE" />
          <XAxis strokeWidth={0} minTickGap={10} dataKey="timestamp" />
          <YAxis strokeWidth={0} domain={['auto', 'auto']} dataKey="sharePrice" />
          <Tooltip animationDuration={200} cursor={{stroke: "#444444", width: '1px'}} itemStyle={{color: 'white'}} wrapperStyle={{backgroundColor: "black", color: "white"}} labelStyle={{color: "white"}} contentStyle={{backgroundColor: "#18181D", color: "white", border: "0px", padding: "10px", borderRadius: "8px"}} />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    } else if(this.state.noData) {
      return this.renderNoData();
    } else {
      return this.renderChart();
    }
  }
}

export default withStyles(demoStyles, { name: "Chart1D" })(ChartComponent);