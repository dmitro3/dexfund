import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/fundRewards.css';

class RewardsTableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {

        return (

            <>
                <div className="w-rewards-table-header">
                    <div className="w-rewards-table-header-item">
                        From
                    </div>
                    <div className="w-rewards-table-header-item">
                        Amount
                    </div>
                    <div className="w-rewards-table-header-item">
                        Value($)
                    </div>
                    <div className="w-rewards-table-header-item" />
                </div>
            </>
        )
    }
}

export default RewardsTableHeader;