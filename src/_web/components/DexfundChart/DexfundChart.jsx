import ReactApexChart from "react-apexcharts";
import React from 'react';
import './DexfundChart.css';

class DexfundChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100]
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



    render() {
        return (
            this.props.outline ? 
            <div className="dexfund-chart-card">
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={this.props.height || 200} width={this.props.width || 200} />
            </div> : <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={this.props.height || 200} width={this.props.width || 200} />
        );
    }
}

export default DexfundChart;
