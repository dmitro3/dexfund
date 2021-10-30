import React, { Component } from "react";
import {connect}  from 'react-redux'

// COMPONENTS
import Header from "../global/header/Header";
import SettingsPopup from "../global/settings-popup/SettingsPopup";
import AddNewFundGeneral from "./add-new-fund-steps/components/AddNewFundGeneral";
import AddNewFundFees from "./add-new-fund-steps/components/AddNewFundFees";
import AddNewFundDeposits from "./add-new-fund-steps/components/AddNewFundDeposits";
import AddNewFundReview from "./add-new-fund-steps/components/AddNewFundReview";
import AddNewFundFinish from "./add-new-fund-steps/components/AddNewFundFinish";
import AddNewFundAdvanced from "./add-new-fund-steps/components/AddNewFundAdvanced";

// ASSETS

// STYLES
import "./addNewFundPage.css";

// ROUTES

// SUBGRAPH
import {
  getAllAdapterIntegrations, 
  getDenominationAssets, 
  getAllAssetsIntegrations}  from  './../../sub-graph-integrations/index'

// REDUX
import {activateLoaderOverlay, deactivateLoaderOverlay}  from  './../../redux/actions/LoaderAction'


class AddNewFundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsPopup: false,
      currentStep: "General",
      assets: [],
      adaptersList: [],
      assetList: []
    };
  }

  async componentDidMount() {
    // show loader
    this.props.activateLoaderOverlay();
    const assets  =  await getDenominationAssets();
    // const adaptersList  =  await getAllAdapterIntegrations();
    const assetList  =  await getAllAssetsIntegrations();
    this.setState({
      assets: assets,
      // adaptersList,
      assetList: assetList
    });

    this.props.deactivateLoaderOverlay()

  }

  renderGeneral() {
    return (
      <>
        <AddNewFundGeneral
          {...this.props}
          goToNextStepEvent={this.goToFeesStep}
          state={this.state}
        />
      </>
    );
  }

  renderFees() {
    return (
      <>
        <AddNewFundFees
          {...this.props}
          goToNextStepEvent={this.goToDepositsStep}
          goToPreviousStepEvent={this.goToGeneralStep}
          state={this.state}
        />
      </>
    );
  }

  renderDeposits() {
    return (
      <>
        <AddNewFundDeposits
          {...this.props}
          goToNextStepEvent={this.goToAdvancedStep}
          goToPreviousStepEvent={this.goToFeesStep}
          state={this.state}
        />
      </>
    );
  }

  renderAdvanced() {
    return (
      <>
        <AddNewFundAdvanced
          {...this.props}
          goToNextStepEvent={this.goToReview}
          goToPreviousStepEvent={this.goToDepositsStep}
          state={this.state}
        />
      </>
    );
  }

  renderReview() {
    return (
      <>
        <AddNewFundReview
          {...this.props}
          goToNextStepEvent={this.goToFundCreated}
          goToPreviousStepEvent={this.goToAdvancedStep}
          state={this.state}
        />
      </>
    );
  }

  renderFundCreated() {
    return (
      <>
        <AddNewFundFinish {...this.props} />
      </>
    );
  }

  goToGeneralStep = (stateFromChild = {}) => {
    this.setState({
      ...this.state,
      ...stateFromChild,
      currentStep: "General",
    });
  };

  goToFeesStep = (stateFromChild) => {
    this.setState({
      ...this.state,
      ...stateFromChild,
      currentStep: "Fees",
    });
  };

  goToDepositsStep = (stateFromChild) => {
    this.setState({
      ...this.state,
      ...stateFromChild,
      currentStep: "Deposits",
    });
  };

  goToAdvancedStep = (stateFromChild) => {
    this.setState({
      ...this.state,
      ...stateFromChild,
      currentStep: "Advanced",
    });
  };

  goToReview = (stateFromChild) => {
    this.setState({
      ...this.state,
      ...stateFromChild,
      currentStep: "Review",
    });
  };

  goToFundCreated = (stateFromChild) => {
    this.setState({
      ...this.state,
      ...stateFromChild,
      currentStep: "FundCreated",
    });
  };

  displaySettingsPopup = () => {
    this.setState({ settingsPopup: true });
  };

  closeSettingsPopup = () => {
    this.setState({ settingsPopup: false });
  };

  renderConnected() {

    const doNotDisplay = {
      display: "none",
    };
    return (
      <>
        <Header
          {...this.props}
          displaySettingsPopupEvent={this.displaySettingsPopup}
        />
        <div className="w-add-new-fund-page-wrapper">
          <div className="w-add-new-fund-page-content">
            <div className="w-add-new-fund-page-title">ADD NEW FUND</div>
            {this.state.currentStep === "General" && this.renderGeneral()}
            {this.state.currentStep === "Fees" && this.renderFees()}
            {this.state.currentStep === "Deposits" && this.renderDeposits()}
            {this.state.currentStep === "Advanced" && this.renderAdvanced()}
            {this.state.currentStep === "Review" && this.renderReview()}
            {this.state.currentStep === "FundCreated" &&
              this.renderFundCreated()}
          </div>
          <div style={this.state.settingsPopup === false ? doNotDisplay : {}}>
            <SettingsPopup
              {...this.props}
              closeSettingsPopupEvent={this.closeSettingsPopup}
            />
          </div>
        </div>
      </>
    )
  }

  renderNotConnected() {
    this.props.history.push('/')
  }

  render() {

    var width = window.innerWidth;

    if (width > 1000) {
      return (
        <>
        {this.props.onboard.walletConnected === true && this.renderConnected()}
        {this.props.onboard.walletConnected === false && this.renderNotConnected()}
        </>
      );
    } 
  }
}

const mapStateToProps = (state) => {
  return {
      account: state.connect,
      onboard: state.onboard
  };
};


const mapDispatchToProps = {
  activateLoaderOverlay, 
  deactivateLoaderOverlay
};


export default connect(mapStateToProps, mapDispatchToProps)(AddNewFundPage);
