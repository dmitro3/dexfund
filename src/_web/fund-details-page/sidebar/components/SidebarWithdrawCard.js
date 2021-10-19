import React, { Component } from 'react';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/sidebar.css';

class SidebarWithdrawCard extends Component {

    render() {

        return (

            <>
                <div className="w-invest-card">
                    <div className="w-invest-card-header">
                        Amount to withdraw
                    </div>
                    
                    <div className="w-invest-card-button">
                        <div className="w-invest-card-button-text">
                            WITHDRAW
                        </div>
                    </div>
                </div>
            </>
        )

    }
}

export default SidebarWithdrawCard;
