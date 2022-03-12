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
        if (!data.holdingHistory) {
          return 0.00;
        }
        if (nodata) {
          return 0.00;
        }
    
        const first = data.holdingHistory[0];
        const last = data.holdingHistory[data.holdingHistory.length - 1];
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
        const data = await getChartdata(this.state.fundAddress, '3M');
        console.log('dexfundchart: ', data)
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
        if (!data || !data.times) return ;
        const times = data.times.map(t => parseInt(t) * 1000);
        const priceValues = data.holdingHistory;
        const maxValue = Math.max(...priceValues);
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
                yaxis : {
                    type: 'numeric',
                    labels: {
                        formatter: function (value) {
                          return value.toFixed(2)
                        }
                    },
                    min: 0,
                    max: parseFloat((maxValue + maxValue/10).toFixed(2))
                }
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
