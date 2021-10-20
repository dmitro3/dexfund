import React, { Component } from "react";
import axios from "axios";

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

class AddNewFundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsPopup: false,
      currentStep: "General",
      assets: [],
    };
  }

  componentDidMount() {
    const url = "https://api.thegraph.com/subgraphs/name/trust0212/radar-graph";
    axios
      .post(url, {
        query: `
        {
          assets(orderBy: symbol, orderDirection: asc) {
           decimals
           curvePoolAssetDetails {
             pool
             gauge
             gaugeToken {
               id
               decimals
               symbol
             }
             invariantProxyAsset {
               decimals
               id
               symbol
             }
             lpToken {
               decimals
               id
               symbol
             }
             numberOfTokens
             pool
            
             token1 {
               decimals
               id
               symbol
             }
             token2 {
               decimals
               id
               symbol
             }
             
           }
           decimals
           derivativeType
           id
           name
           price {
             price
             timestamp
           }
           symbol
           type
           underlyingAsset {
             id
             decimals
             name
             symbol
           }
           uniswapV2PoolAssetDetails {
             id
           }
         }
         }
        `,
      })
      .then((response) => {
        let assets = response.data.data.assets;
        this.setState({
          assets,
        });
      })
      .catch((err) => {
        console.log(`Error:`, err);
      });
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

  render() {
    var width = window.innerWidth;

    const doNotDisplay = {
      display: "none",
    };

    if (width > 1000) {
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
      );
    } else {
      return <></>;
    }
  }
}

export default AddNewFundPage;
