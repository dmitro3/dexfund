import React, { Component } from 'react';

// COMPONENTS
import Header from '../global/header/Header';
import SettingsPopup from '../global/settings-popup/SettingsPopup';
import AddNewFundGeneral from './add-new-fund-steps/components/AddNewFundGeneral';
import AddNewFundFees from './add-new-fund-steps/components/AddNewFundFees';
import AddNewFundDeposits from './add-new-fund-steps/components/AddNewFundDeposits';
import AddNewFundReview from './add-new-fund-steps/components/AddNewFundReview';
import AddNewFundFinish from './add-new-fund-steps/components/AddNewFundFinish';
import AddNewFundAdvanced from './add-new-fund-steps/components/AddNewFundAdvanced';

// ASSETS
// ...

// STYLES
import './addNewFundPage.css';
// import { ThumbDownSharp } from '@material-ui/icons';

class AddNewFundPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settingsPopup: false,
            currentStep: 'General',

            fundName: '',
            managerName: '',
            denominationAsset: '',
        }
    }

    renderGeneral() {

        return (

            <>
                <AddNewFundGeneral {...this.props}
                    goToNextStepEvent={this.goToFeesStep}
                />
            </>
        )
    }

    renderFees() {

        return (

            <>
                <AddNewFundFees {...this.props}
                    goToNextStepEvent={this.goToDepositsStep}
                    goToPreviousStepEvent={this.goToGeneralStep}
                />
            </>
        )
    }

    renderDeposits() {

        return (

            <>
                <AddNewFundDeposits {...this.props}
                    goToNextStepEvent={this.goToReview}
                    goToPreviousStepEvent={this.goToFeesStep}
                />
            </>
        )
    }

    // renderDeposits() {

    //     return (

    //         <>
    //             <AddNewFundDeposits {...this.props}
    //                 goToNextStepEvent={this.goToAdvancedStep}
    //                 goToPreviousStepEvent={this.goToFeesStep}
    //             />
    //         </>
    //     )
    // }

    renderAdvanced() {

        return (

            <>
                <AddNewFundAdvanced {...this.props}
                    goToNextStepEvent={this.goToReview}
                    goToPreviousStepEvent={this.goToDepositsStep}
                />
            </>
        )
    }

    renderReview() {

        return (

            <>
                <AddNewFundReview {...this.props}
                    goToNextStepEvent={this.goToFundCreated}
                    goToPreviousStepEvent={this.goToAdvancedStep}
                    
                    fundNameFromParent={this.state.fundName}
                    managerNameFromParent={this.state.managerName}
                    denominationAssetFromParent={this.state.denominationAsset}
                />
            </>
        )
    }

    renderFundCreated() {
        
        return (

            <>
                <AddNewFundFinish {...this.props}
                    
                />
            </>
        )
    }

    goToGeneralStep = () => {
        this.setState({ currentStep: 'General' })
    }

    goToFeesStep = (fundNameFromChild, managerNameFromChild, denominationAssetFromChild) => {
        this.setState({ 
            currentStep: 'Fees',
            fundName: fundNameFromChild,
            managerName: managerNameFromChild,
            denominationAsset: denominationAssetFromChild
        })
    }

    goToDepositsStep = () => {
        this.setState({ currentStep: 'Deposits' })
    }

    goToAdvancedStep = () => {
        this.setState({ currentStep: 'Advanced' })
    }

    goToReview = () => {
        this.setState({ currentStep: 'Review' })
    }

    goToFundCreated = () => {
        this.setState({ currentStep: 'FundCreated' })
    }

    displaySettingsPopup = () => {
        this.setState({ settingsPopup: true })
    }

    closeSettingsPopup = () => {
        this.setState({ settingsPopup: false })
    }

    render() {

        var width = window.innerWidth;

        const doNotDisplay = {
            display: 'none',
        }

        if (width > 1000) {
            return (

                <>
                    <Header {...this.props}
                        displaySettingsPopupEvent={this.displaySettingsPopup} />
                    <div className="w-add-new-fund-page-wrapper">
                        <div className="w-add-new-fund-page-content">
                            <div className="w-add-new-fund-page-title">
                                ADD NEW FUND
                            </div>
                            {this.state.currentStep === 'General' && this.renderGeneral()}
                            {this.state.currentStep === 'Fees' && this.renderFees()}
                            {this.state.currentStep === 'Deposits' && this.renderDeposits()}
                            {this.state.currentStep === 'Advanced' && this.renderAdvanced()}
                            {this.state.currentStep === 'Review' && this.renderReview()}
                            {this.state.currentStep === 'FundCreated' && this.renderFundCreated()}
                        </div>
                        <div style={this.state.settingsPopup === false ? doNotDisplay : {}}>
                            <SettingsPopup {...this.props}
                                closeSettingsPopupEvent={this.closeSettingsPopup} />
                        </div>
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

export default AddNewFundPage;