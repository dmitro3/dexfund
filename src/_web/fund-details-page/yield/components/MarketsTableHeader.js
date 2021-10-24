import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/fundYield.css';

class MarketsTableHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {

        return (

            <>
                <div className="w-markets-table-header">
                    <div className="w-markets-table-header-item name">
                        Name
                    </div>
                    <div className="w-markets-table-header-item protocols">
                        Protocols
                    </div>
                    <div className="w-markets-table-header-item balance">
                        Balance
                    </div>
                    <div className="w-markets-table-header-item best-apy">
                        Best APY
                    </div>
                </div>
            </>
        )
    }
}

export default MarketsTableHeader;