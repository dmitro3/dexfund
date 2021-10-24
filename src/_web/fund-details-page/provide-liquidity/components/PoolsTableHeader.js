import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/fundProvideLiquidity.css';

class PoolsTableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {

        return (

            <>
                <div className="w-pools-table-header">
                    <div className="w-pools-table-header-item tokens">
                        Tokens
                    </div>
                    <div className="w-pools-table-header-item pool-size">
                        Pool size ($)
                    </div>
                    <div className="w-pools-table-header-item total-apy">
                        Total APY
                    </div>
                    <div className="w-pools-table-header-item your-assets">
                        Your assets
                    </div>
                    <div className="w-pools-table-header-item deposit"/>
                </div>
            </>
        )
    }
}

export default PoolsTableHeader;