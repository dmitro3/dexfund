import React, { Component } from 'react';

// COMPONENTS
import RulesetSettings from './components/RulesetSettings';
import FeesSettings from './components/FeesSettings';
import { connect } from 'react-redux';

// ASSETS
// ... 

// CSS
import './styles/fundSettings.css';

class FundSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props.props,
            ...this.props.state,
            selectedSidebarItem: 'Asset'
        }
    }

    render() {

        var width = window.innerWidth;
        
        const selectedSidebarItemStyle = {
            background: "linear-gradient(to right, #E926C3 10%, #FF4D86 100%)",
            "-webkit-background-clip": "text",
            WebkitTextFillColor: "transparent",
        };
      
        if (width > 1000) {
            return (

                <>
                 <div className="w-sidebar-wrapper">
                    <div className="w-sidebar-content">
                        <div className="w-sidebar-header">
                            <div className="w-sidebar-menu">
                                <div
                                    className="w-sidebar-menu-item"
                                    style={
                                    this.state.selectedSidebarItem === "Asset"
                                        ? selectedSidebarItemStyle
                                        : {}
                                    }
                                    onClick={() =>
                                    this.setState({ selectedSidebarItem: "Asset" })
                                    }
                                >
                                    Asset
                                </div>
                                <div
                                    className="w-sidebar-menu-item"
                                    style={
                                    this.state.selectedSidebarItem === "Deposit"
                                        ? selectedSidebarItemStyle
                                        : {}
                                    }
                                    onClick={() =>
                                    this.setState({ selectedSidebarItem: "Deposit" })
                                    }
                                >
                                    Deposit
                                </div>
                            </div>
                        </div>
                        {this.state.selectedSidebarItem === "Asset" &&
                            <RulesetSettings />}
                        {this.state.selectedSidebarItem === "Deposit" &&
                            <FeesSettings />}
                    </div>
                </div>
                    
                </> 

            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
      account: state.connect,
    };
  };
  
  const mapDispatchToProps = {
    
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(FundSettings);

