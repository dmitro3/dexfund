import React from 'react';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
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
  
  
  
  const demoStyles = () => ({
    chart: {
      paddingRight: '30px',
    },
  });
  
  class Chart3M extends React.PureComponent {
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
              valueField="chart3m"
              argumentField="time"
              seriesComponent={Line}
            />
            <Animation />
          </Chart>
        </Paper>
      );
    }
  }
  
  export default withStyles(demoStyles, { name: 'Chart3M' })(Chart3M);
  