import React from 'react';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  LineSeries,
  Legend,
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
  
  const legendLabelStyles = theme => ({
    label: {
      marginBottom: theme.spacing(1),
      whiteSpace: 'nowrap',
    },
  });
  const legendItemStyles = () => ({
    item: {
      flexDirection: 'column-reverse',
    },
  });
  
  const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
  );
  const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
  );
  const demoStyles = () => ({
    chart: {
      paddingRight: '30px',
    },
  });
  
  class Chart1Y extends React.PureComponent {
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
              name="Performance Chart1Y"
              valueField="chart1y"
              argumentField="time"
              seriesComponent={Line}
            />
            <Animation />
          </Chart>
        </Paper>
      );
    }
  }
  
  export default withStyles(demoStyles, { name: 'Chart1Y' })(Chart1Y);
  