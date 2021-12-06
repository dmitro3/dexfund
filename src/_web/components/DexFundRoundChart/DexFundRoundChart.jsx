import ReactApexChart from "react-apexcharts";
import React from 'react';
import './DexFundRoundChart.css';

class DexfundRoundChart extends React.Component {
    constructor(props) {
        super(props);
        const titles = props.values.map(v => v.fundName) || ['unknow funds']

        this.state = {
            titles,
            series: [1],
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
        const titles = props.values.map(v => v.fundName) || ['unknow funds']
        this.setState({
            titles,
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
                tooltip: {
                    y: {
                        formatter: undefined,
                        title: {
                            formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
                                return titles[seriesIndex] + ':' + value
                            },
                        },
                    },
                    x: {
                        formatter: undefined,
                        title: {
                            formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
                                return titles[seriesIndex] + ':' + value
                            },
                        },
                    },
                    z: {
                        formatter: undefined,
                        title: {
                            formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
                                return titles[seriesIndex] + ':' + value
                            },
                        },
                    },
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
        console.log('current options: ', this.state.options)
        console.log('current series: ', this.state.series)
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width={350}/>
        );
    }
}

export default DexfundRoundChart;
