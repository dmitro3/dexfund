import ReactApexChart from "react-apexcharts";
import React from 'react';
import './DexfundChart.css';
import { getChartdata } from "../../../sub-graph-integrations";

class DexfundChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            series: [{
                name: 'series1',
                data: [0, 0, 0, 0, 0, 0, 0]
            }],
            options: {
                chart: {
                    height: props.height || 300,
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
                    categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
                },
                yaxis: {
                    type: 'numeric',
                    labels: {
                        formatter: function (value) {
                          return props.yLabel ? value : "";
                        }
                    }
                },
            },
        };
    }
    componentWillReceiveProps(props) {
        if (props.fundAddress) {
            this.getChartData();
        }
    }

    calculateIncrease = (data, nodata) => {
        if (!data.sharePrices) {
          return 0.00;
        }
        if (nodata) {
          return 0.00;
        }
    
        const first = data.sharePrices[0];
        const last = data.sharePrices[data.sharePrices.length - 1];
        const increase = first > 0 ? (((last-first)/first)*100).toFixed(2) : 100;
        return increase;
      }
    
      roundMinutes(date) {
    
        date.setHours(date.getHours() + Math.round(date.getMinutes()/60));
        date.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
    
        return date;
      }
    
      async getChartData() {
        // await this.setState({ loading: true });
    
        var noData = false;
        const data = await getChartdata(this.state.fundAddress, '1D');
        console.log('chardData: ', data);
        if (!data) {
          noData = true;
        }
    
        // for(var i = 0; i < data.length; i++) {
        //   if (data[i].sharePrice == 0) {
        //     noData = true;
        //     break;
        //   }
        // }
    
        const chartIncrease = this.calculateIncrease(data, noData);
        const ethPrice = parseFloat(this.props.ethPrice);
        console.log('chartIncrease: ', chartIncrease, data, ethPrice);

        const times = data.times.map(t => parseInt(t) * 1000);
        const priceValues = data.sharePrices.map(p => (parseFloat(p) * ethPrice).toFixed(2));
        console.log('priceValues: ', priceValues)
        const fundName = this.props.fundName
        const series = [{
            name: fundName,
            data: priceValues
        }];

        this.setState((prevState, props) => ({ 
            loading: false, 
            selectedData: data, 
            series,
            options: {
                ...prevState.options,
                xaxis: {
                    type: 'datetime',
                    categories: times
                },
            },
            noData: noData, 
            portfolioPercent: chartIncrease 
        }));
      }



    render() {
        return (
            this.props.outline ? 
            <div className="dexfund-chart-card">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={this.props.height || 220} width={this.props.width || 200} />
            </div> : <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={this.props.height || 220} width={this.props.width || 200} />
        );
    }
}

export default DexfundChart;
