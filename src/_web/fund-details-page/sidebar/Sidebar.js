import React, { Component } from 'react';

// REDUX
import {connect}  from  'react-redux'

// COMPONENTS
import SidebarInvestCard from './components/SidebarInvestCard';
import SidebarWithdrawCard from './components/SidebarWithdrawCard';

// ASSETS
import settingsIcon from './assets/settings-icon.svg';

// CSS
import './styles/sidebar.css';

class Sidebar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedSidebarItem: 'invest'
        }
    }

    renderInvestCard() {

        return (

            <>
                <SidebarInvestCard />
            </>
        )
    }

    renderWithdrawCard() {

        return (

            <>
                <SidebarWithdrawCard />
            </>
        )
    }

    render() {

        const selectedSidebarItemStyle = {
            background: 'linear-gradient(to right, #E926C3 10%, #FF4D86 100%)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
        }

        return this.props.account && (this.props.account.connectSuccess ? (

            <>
                <div className="w-sidebar-wrapper">
                    <div className="w-sidebar-content">
                        <div className="w-sidebar-header">
                            <div className="w-sidebar-menu">
                                <div className="w-sidebar-menu-item"
                                    style={this.state.selectedSidebarItem === "invest" ? selectedSidebarItemStyle : {}}
                                    onClick={() => this.setState({ selectedSidebarItem: 'invest' })}>
                                    Invest
                                </div>
                                <div className="w-sidebar-menu-item"
                                    style={this.state.selectedSidebarItem === "withdraw" ? selectedSidebarItemStyle : {}}
                                    onClick={() => this.setState({ selectedSidebarItem: 'withdraw' })}>
                                    Withdraw
                                </div>
                            </div>
                            <img src={settingsIcon} alt='settings-icon' className="sidebar-settings-icon" />
                        </div>
                        {this.state.selectedSidebarItem === 'invest' && this.renderInvestCard()}
                        {this.state.selectedSidebarItem === 'withdraw' && this.renderWithdrawCard()}
                    </div>
                </div>
            </> 
        ): <> </>)

    }
}


const mapStateToProps = (state) => {
    return {
        account: state.connect,
    };
};


const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

