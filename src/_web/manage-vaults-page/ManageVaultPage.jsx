import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnboardInformation } from "../../redux/reducers/OnboardReducer";
import './ManageVaultPage.css';
import {
    getAllAdapterIntegrations, 
    getDenominationAssets, 
    getAllAssetsIntegrations}  from  './../../sub-graph-integrations/index';
import { useEffect } from "react";
import { createNewFund, EntranceRateDirectFee, getEntranceRateFeeConfigArgs, getFeesManagerConfigArgsData, getMinMaxDepositPolicyArgs, getPerformanceFees, getPolicyArgsData, MinMaxInvestment, PerformanceFee } from "../../ethereum/funds/fund-related";
import { getAssetDecimals } from "../../ethereum/utils";
import { activateLoaderOverlay, deactivateLoaderOverlay } from "../../redux/actions/LoaderAction";
import { utils } from "ethers";
import { toastr } from "react-redux-toastr";
import FloatingInput from "../components/FloatingInput/FloatingInput";

const ManageVaultPage = () => {

    const dispatch = useDispatch();
    const onboard = useSelector(state => getOnboardInformation(state));

    const [walletAddress, setWalletAddress] = useState(onboard.address);
    const [fundName, setFundName] = useState('');
    const [performanceFee, setPerformanceFee] = useState(undefined);
    const [entryFee, setEntryFee] = useState(undefined);
    const [minimumInvestment, setMinimumInvestment] = useState(undefined);
    const [startingAssetAddress, setstartingAssetAddress] = useState();
    const [bio, setBio] = useState('');
    const [assets, setAssets] = useState([]);


    useEffect(() => {
        (async () => {
            const _assets  =  await getDenominationAssets() || [];
            setAssets(_assets);
        })();
    }, [onboard.provider]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidate()) {
            toastr.warning('Please input correct data');
            return;
        }

        const {feeArgsData, policyArgsData} = await prepareFundData();
       
        try {
            const fund = await createNewFund(
                walletAddress,
                fundName,
                startingAssetAddress,
                3600,
                feeArgsData,
                policyArgsData,
                1000000,
                onboard.provider,
                onboard.address
            );
            dispatch(deactivateLoaderOverlay());
            setWalletAddress(onboard.address);
            setstartingAssetAddress('');
            setEntryFee(undefined);
            setMinimumInvestment(undefined);
            setPerformanceFee(undefined);
            setBio('');
            toastr.success("Successfully created a new vault");
          } catch (error) {
            console.log('create fund error: ', error)
            toastr.error("Error occurred while creating a Vault: ", error.message);
            dispatch(deactivateLoaderOverlay());
          }
    }

    const generateColor = (seed) => {
        const color = seed.slice(2, 8);
        console.log('color: ', color);

        return `#${color}44`;
    }

    const isValidate = () => {
        return walletAddress && fundName && performanceFee && entryFee && minimumInvestment && startingAssetAddress;
    }

    const handleSelectAsset = (selectedAssetAddress) => {
        setstartingAssetAddress(selectedAssetAddress);
    }

    const prepareFundData = async () => {
        dispatch(activateLoaderOverlay());
    
        let feeManagerSettingsData = []; // value configurations
        let fees = []; // list of address
    
        if (entryFee) {
          fees.push(EntranceRateDirectFee.address);
          feeManagerSettingsData.push(
            getEntranceRateFeeConfigArgs(entryFee)
          );
        }
    
        if (performanceFee) {
          fees.push(PerformanceFee.address);
          feeManagerSettingsData.push(
            getPerformanceFees(performanceFee, 6)
          );
        }
    
        let feeArgsData;
    
        // IF CONFIGURATIONS (FEES and FEE SETTING) are not Provided
        if (fees.length === 0) {
          feeArgsData = utils.hexlify("0x");
        } else {
          /// PREPARE FEE CONFIGURATIONS DATA
          feeArgsData = await getFeesManagerConfigArgsData(
            fees,
            feeManagerSettingsData,
            onboard.address,
            true
          );
        }
    
        let policyManagerSettingsData = [];
        let policies = [];
    
        // Min / Max Investment Policy
        if (minimumInvestment) {
          try {
            // Get values from frontend. Should be 0 if they are not enabled.
            let minDeposit = minimumInvestment ? minimumInvestment : 0;
            let maxDeposit = 0;
            // Scale the minDeposit/maxDeposit values to the denomination asset's decimals
            var denominationAssetDecimals = await getAssetDecimals(
              startingAssetAddress,
              onboard.provider
            );
            console.log('min: ', denominationAssetDecimals);
            minDeposit =
              minDeposit === 0
                ? 0
                : utils
                    .parseEther(minDeposit)
                    .div(10 ** (18 - denominationAssetDecimals));
            maxDeposit =
              maxDeposit === 0
                ? 10
                : utils
                    .parseEther(maxDeposit)
                    .div(10 ** (18 - denominationAssetDecimals));
    
            // Push settings and actual policy
            policies.push(MinMaxInvestment.address);
            policyManagerSettingsData.push(
              getMinMaxDepositPolicyArgs(minDeposit, maxDeposit)
            );
          } catch (e) {
            // TODO: CHANGE THIS ALERT WITH A GOOD FRONTEND ALERT
            // alert("Error processing you Min/Max Deposit values");
            console.error('error: ', e);
          }
        }
    
        let policyArgsData;
        if (policies.length === 0) {
          policyArgsData = utils.hexlify("0x");
        } else {
          policyArgsData = getPolicyArgsData(policies, policyManagerSettingsData);
        }

        return {
            feeArgsData,
            policyArgsData
        }
    };

    return (
        <div className="manage-vault-wrapper">
            <h3 className="title">Create a Dexfund</h3>
            <div className="manage-body">
                <form onSubmit={handleSubmit} className="create-fund-form">
                    <div className="manage-form-group w-100">
                      <FloatingInput
                        id="fundOwner"
                        value={walletAddress}
                        placeholder="Fund Owner Address" 
                        onChange={(value) => setWalletAddress(value)} 
                        className="manage-form-control"
                      />
                    </div>
                   
                    <div className="manage-form-group w-100">
                      <FloatingInput
                        id="fundName"
                        value={fundName}
                        placeholder="Dexfund Name" 
                        onChange={(value) => setFundName(value)} 
                        className="manage-form-control"
                      />
                    </div>
                    <div className="manage-form-group w-49">
                      <FloatingInput
                        id="performanceFee"
                        type="number"
                        value={performanceFee}
                        placeholder="Performance Fee (%)" 
                        onChange={(value) => setPerformanceFee(value)} 
                        className="manage-form-control"
                      />
                    </div>
                    <div className="manage-form-group w-49">
                      <FloatingInput
                        type="number"
                        id="entryFee"
                        value={entryFee}
                        placeholder="Entry Fee (%)" 
                        onChange={(value) => setEntryFee(value)} 
                        className="manage-form-control"
                      />
                    </div>
                    <div className="manage-form-group w-49">
                      <FloatingInput
                        id="min_investment"
                        type="number"
                        value={minimumInvestment}
                        placeholder="Minimum Investment" 
                        onChange={(value) => setMinimumInvestment(value)} 
                        className="manage-form-control"
                      />
                    </div>
                    <div className="manage-form-group w-100 assets-layout">
                        <label htmlFor="" className="control-label">Select Starting Assets</label>
                        <div className="assets-wrapper">
                            {
                                assets.map((asset, index) => (
                                    <label htmlFor="" 
                                        className={"asset-label " + (startingAssetAddress === asset.id ? " active" : "")} 
                                        style={{background: generateColor(asset.id)}}
                                        onClick={() => handleSelectAsset(asset.id)}
                                    >{asset.symbol}</label>
                                ))
                            }
                        </div>
                    </div>
                    <div className="manage-form-group w-100">
                      <textarea
                        id="bio"
                        value={bio}
                        placeholder="Bio" 
                        onChange={(e) => setBio(e.target.value)} 
                        className="manage-form-control"
                      />
                    </div>
                    <button type="submit" disabled={!isValidate()}>Create New Fund</button>
                </form>
            </div>
        </div>
    );
}

export default ManageVaultPage;