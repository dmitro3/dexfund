import React, { Component } from 'react';
import { withdraw } from '../../../../ethereum/funds/fund-related';

// COMPONENTS
// ...

// ASSETS
// ...

// CSS
import '../styles/sidebar.css';

class SidebarWithdrawCard extends Component {

    onWithdraw = () => {
        const pathName = window.location.pathname;
        const pathArray = pathName.split('/');
        const fundAddress = pathArray.pop();
        console.log('pathName: ', fundAddress);
        withdraw(fundAddress, "0.005");
    }

    render() {
    
        return (

            <>
                <div className="w-invest-card">
                    <div className="w-invest-card-header">
                        Amount to withdraw
                    </div>
                    
                    <div className="w-invest-card-button">
                        <div className="w-invest-card-button-text" onClick={() => this.onWithdraw()}>
                            WITHDRAW
                        </div>
                    </div>
                </div>
            </>
        )

    }
}

export default SidebarWithdrawCard;
