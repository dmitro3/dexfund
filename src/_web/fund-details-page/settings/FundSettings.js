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
            ...this.props.state
        }
    }

    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="w-fund-settings-wrapper">
                        <RulesetSettings state={this.state}/>
                        <FeesSettings />
                    </div>
                </>

            )
        } else {
            return (

                <>

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

