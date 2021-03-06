import React from 'react';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  // ValueAxis,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';

import { energyConsumption as data } from './demo-data/data-vizualization';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/portfolio.css';

const Line = props => (
    <LineSeries.Path
      {...props}
      path={line()
        .x(({ arg }) => arg)
        .y(({ val }) => val)
        .curve(curveCatmullRom)}
    />
  );
  
  const titleStyles = {
    title: {
      textAlign: 'center',
      width: '100%',
      marginBottom: '10px',
    },
  };
  
  
  // const legendRootBase = ({ classes, ...restProps }) => (
  //   <Legend.Root {...restProps} className={classes.root} />
  // );
  // const legendLabelBase = ({ classes, ...restProps }) => (
  //   <Legend.Label className={classes.label} {...restProps} />
  // );
  // const legendItemBase = ({ classes, ...restProps }) => (
  //   <Legend.Item className={classes.item} {...restProps} />
  // );
  // const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
  // const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
  // const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
  const demoStyles = () => ({
    chart: {
      paddingRight: '30px',
    },
  });
  
  class Chart6M extends React.PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        data,
      };
    }
  
    render() {
      const { data: chartData } = this.state;
      const { classes } = this.props;
  
      return (
        <Paper>
          <Chart
            data={chartData}
            className={classes.chart}
          >
            <ArgumentScale factory={scalePoint} />
            <ArgumentAxis />
            <LineSeries
              name="Performance Chart3D"
              valueField="chart6m"
              argumentField="time"
              seriesComponent={Line}
            />
            <Animation />
          </Chart>
        </Paper>
      );
    }
  }
  
  export default withStyles(demoStyles, { name: 'Chart6M' })(Chart6M);
  