import React, { Component } from 'react';

// COMPONENTS
import Chart1D from './components/Chart1D';
import Chart1W from './components/Chart1W';
import Chart1M from './components/Chart1M';
import Chart3M from './components/Chart3M';
import Chart6M from './components/Chart6M';
import Chart1Y from './components/Chart1Y';

// ASSETS
import greenArrowIcon from './assets/green-arrow-icon.svg';
import separatorIcon from './assets/separator-icon.svg';

// CSS
import './styles/portfolio.css';

class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedChart: '1D',
            portfolioTimeframe: 'Last day',
            portfolioPercent: '4.30%', // for 1D

            percent_1D: '4.30%',
            percent_1W: '5.24%',
            percent_1M: '10.84%',
            percent_3M: '8.65%',
            percent_6M: '10.4%',
            percent_1Y: '22.43%'
        }
    }

    setChartDetails = (chart, timeframe, percent) => {
        this.setState({
            selectedChart: chart,
            portfolioTimeframe: timeframe,
            portfolioPercent: percent
        })
    }

    render1DChart() {

        return (

            <>
                <Chart1D />
            </>
        )
    }

    render1WChart() {

        return (

            <>
                <Chart1W />
            </>
        )
    }

    render1MChart() {

        return (

            <>
                <Chart1M />
            </>
        )
    }

    render3MChart() {

        return (
            <>
                <Chart3M />
            </>
        )
    }

    render6MChart() {

        return (
            <>
                <Chart6M />
            </>
        )
    }

    render1YChart() {

        return (
            <>
                <Chart1Y />
            </>
        )
    }

    render() {

        const selectedMenuItem = {
            color: '#fff'
        }

        return (

            <>
                <div className="w-portfolio-wrapper">
                    <div className="w-portfolio-header">
                        <div className="w-portfolio-header-title-section">
                            <div className="w-portfolio-header-title">
                                $2,4123.23
                            </div>
                            <div className="w-portfolio-header-subtitle-section">
                                <div className="w-portfolio-header-subtitle">
                                    Your portfolio
                                </div>
                                <img src={separatorIcon} alt='separator-icon' className="separator-icon" />
                                <div className="w-portfolio-header-subtitle">
                                    {this.state.portfolioTimeframe}
                                </div>
                                <img src={greenArrowIcon} alt='green-arrow-icon' className="green-arrow-icon" />
                                <div className="w-portfolio-header-subtitle-percent">
                                    {this.state.portfolioPercent}
                                </div>
                            </div>
                        </div>
                        <div className="w-portfolio-charts-menu">
                            <div className="w-portfolio-charts-menu-item"
                                style={this.state.selectedChart === '1D' ? selectedMenuItem : {}}
                                onClick={() => this.setChartDetails('1D', 'Last day', this.state.percent_1D)} >
                                1D
                            </div>
                            <div className="w-portfolio-charts-menu-item"
                                style={this.state.selectedChart === '1W' ? selectedMenuItem : {}}
                                onClick={() => this.setChartDetails('1W', 'Last week', this.state.percent_1W)} >
                                1W
                            </div>
                            <div className="w-portfolio-charts-menu-item"
                                style={this.state.selectedChart === '1M' ? selectedMenuItem : {}}
                                onClick={() => this.setChartDetails('1M', 'Last month', this.state.percent_1M)} >
                                1M
                            </div>
                            <div className="w-portfolio-charts-menu-item"
                                style={this.state.selectedChart === '3M' ? selectedMenuItem : {}}
                                onClick={() => this.setChartDetails('3M', 'Last 3 months', this.state.percent_3M)} >
                                3M
                            </div>
                            <div className="w-portfolio-charts-menu-item"
                                style={this.state.selectedChart === '6M' ? selectedMenuItem : {}}
                                onClick={() => this.setChartDetails('6M', 'Last 6 months', this.state.percent_6M)} >
                                6M
                            </div>
                            <div className="w-portfolio-charts-menu-item"
                                style={this.state.selectedChart === '1Y' ? selectedMenuItem : {}}
                                onClick={() => this.setChartDetails('1Y', 'Last year', this.state.percent_1Y)} >
                                1Y
                            </div>
                        </div>
                    </div>
                    {this.state.selectedChart === '1D' && this.render1DChart()}
                    {this.state.selectedChart === '1W' && this.render1WChart()}
                    {this.state.selectedChart === '1M' && this.render1MChart()}
                    {this.state.selectedChart === '3M' && this.render3MChart()}
                    {this.state.selectedChart === '6M' && this.render6MChart()}
                    {this.state.selectedChart === '1Y' && this.render1YChart()}
                </div>
            </>
        )

    }
}

export default Portfolio;
