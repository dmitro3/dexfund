import React, { Component } from 'react';

// COMPONENTS
import RulesetSettings from './components/RulesetSettings';
import FeesSettings from './components/FeesSettings';

// ASSETS
// ... 

// CSS
import './styles/fundSettings.css';

class FundSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        var width = window.innerWidth;

        if (width > 1000) {
            return (

                <>
                    <div className="w-fund-settings-wrapper">
                        <RulesetSettings />
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

export default FundSettings;
