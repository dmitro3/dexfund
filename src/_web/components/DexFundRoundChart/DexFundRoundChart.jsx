import ReactApexChart from "react-apexcharts";
import React from 'react';
import './DexFundRoundChart.css';

class DexfundRoundChart extends React.Component {
    constructor(props) {
        super(props);
        const titles =  ["Sarah's", "Alt Queen", "BlackRock", "Vanguard", "CryptoGod"];

        this.state = {
            series: [44, 55, 41, 17, 15],
            options : {
                chart: {
                    width: 480,
                    type: 'donut',
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 270
                    }
                },
                dataLabels: {
                    enabled: true,
                    position: 'top',
                    offsetX: 10,
                    offsetY: 10,
                    formatter: function(val) {
                        return Math.ceil(val) + '%';
                    },
                    style: {
                        fontSize: '12px',
                        fontWeight: 'bold',
                    },
                    background: {
                        enabled: false,
                        foreColor: '#000',
                        borderRadius: '50%',
                        opacity: 1,
                        borderWidth: 10,
                        borderColor: '#fff'
                    },
                },
                fill: {
                    type: 'gradient',
                },
                legend: {
                    formatter: function (val, opts) {
                        return titles[opts.seriesIndex]
                    }
                },
                title: {
                    text: ''
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
        }
    }

    componentWillReceiveProps(props) {
        console.log('props: ', props)
        const titles = props.values.map(v => v.fundName)
        this.setState({
            series: props.values.map(v => v.AUM),
            options : {
                chart: {
                    width: 480,
                    type: 'donut',
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 270
                    }
                },
                dataLabels: {
                    enabled: true,
                    position: 'top',
                    offsetX: 10,
                    offsetY: 10,
                    formatter: function(val) {
                        return Math.ceil(val) + '%';
                    },
                    style: {
                        fontSize: '12px',
                        fontWeight: 'bold',
                    },
                    background: {
                        enabled: false,
                        foreColor: '#000',
                        borderRadius: '50%',
                        opacity: 1,
                        borderWidth: 10,
                        borderColor: '#fff'
                    },
                },
                fill: {
                    type: 'gradient',
                },
                legend: {
                    formatter: function (val, opts) {
                        return titles[opts.seriesIndex]
                    }
                },
                title: {
                    text: ''
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            }
        })
    }

    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={350}/>
        );
    }
}

export default DexfundRoundChart;
