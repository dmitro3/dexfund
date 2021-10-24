import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/fundStake.css';

class StakeTableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {

        return (

            <>
                <div className="w-stake-table-header">
                    <div className="w-stake-table-header-item">
                        Asset
                    </div>
                    <div className="w-stake-table-header-item">
                        Balance
                    </div>
                    <div className="w-stake-table-header-item">
                        Value($)
                    </div>
                    <div className="w-stake-table-header-item"
                        style={{textAlign:'right'}}
                    />
                </div>
            </>
        )
    }
}

export default StakeTableHeader;