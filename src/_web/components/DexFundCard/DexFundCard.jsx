import { useEffect, useState } from 'react';
import { getEthPrice, getTopAsset } from '../../../ethereum/funds/fund-related';
import Chart1D from '../../global/portfolio/components/Chart1D';
import Portfolio from '../../global/portfolio/Portfolio';
import DexfundChart from '../DexfundChart/DexfundChart';
import RoundCard from '../RoundCard/RoundCard';
import avatar from './avatar.png'
import './DexFundCard.css';
import {format, formatDistance, subDays} from 'date-fns';
import { getAUM, getFundCompostion, minMaxDepositAmounts } from '../../../sub-graph-integrations';
import { useHistory } from 'react-router-dom';
import { getIconSource } from '../../../icons';
import VaultChart from '../../fund-details-page/overview/components/portfolio/VaultChart';
import { getFundDetails } from '../../../sub-graph-integrations/get-funds';
import { getCreationSharePrices } from '../../../api/statistics';
import configs from '../../../config';

const DexFundCard = (props) => {
    const {fund} = props; 
    const [biggestHolding, setBiggestHolding] = useState(undefined);
    const [policy, setPolicy] = useState({});
    const history = useHistory();
    const [fundDetails, setFundDetails] = useState({});
    const [ethPrice, setEthPrice] = useState(1);
    const [currentSharePrice, setCurrentSharePrice] = useState(1);
    const [startingSharePrice, setStartingSharePrice] = useState(1);
    const [ltr, setLTR] = useState(1);
    const [AUM, setAUM] = useState(0);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const topAsset = getTopAsset(fund);
        console.log('topAsset Result: ', fund);
        (async () => {
            const policy = await minMaxDepositAmounts(fund.id);
            setPolicy(policy);
        })()
        
        setBiggestHolding(topAsset);
    }, [props]);

    useEffect(() => {
        (async () => {
            var vaultAddress = fund.id;
            var _fundDetails = await getFundDetails(vaultAddress);
        
            const fundComposition = await getFundCompostion(vaultAddress);
            if (!fundComposition || !fundComposition.shares) return;
            var totalSupply = fundComposition.shares.totalSupply;
        
            let _ethPrice = await getEthPrice();
            let aum = await getAUM(vaultAddress);
            let _currentSharePrice = (aum * _ethPrice) / parseFloat(totalSupply);
            var startingSharePrice = await getCreationSharePrices([vaultAddress]);
            startingSharePrice = startingSharePrice[vaultAddress]
        
            var profit = _currentSharePrice - startingSharePrice;
            var _ltr = (profit / startingSharePrice) * 100;
        
            console.log("LIFETIME RETURN: "+_ltr)
        
            var isRegistered = _fundDetails.length > 0;
            if (configs.BLACKLISTED_VAULTS.includes(vaultAddress) || !isRegistered) {
              await this.props.deactivateLoaderOverlay();
              this.toPage("/");
              return;
            }
            _fundDetails = _fundDetails[0];
    
            setFundDetails(_fundDetails);
            setEthPrice(_ethPrice);
            setCurrentSharePrice(_currentSharePrice);
            setStartingSharePrice(startingSharePrice);
            setLTR(_ltr);
            setLoaded(true);
            setAUM(aum);
        })();
    }, [props]) 
        
      
    const toPage = (path) => {
        history.push(path);
        
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }

    return (
        <RoundCard flatable={true}>
            <div className="dexfund-card" >
            <div className="dexfund-card-header" onClick={() => {toPage(`/fund/${fund.id}`)}}>
                <div className="dexfund-info">
                    <img src={avatar} alt="" className="avatar" />
                    <div className="dexfund-text">
                        <h4 className="dexfund-name">{fund.name}</h4>
                        <span className="dexfund-detail">{fund.id}</span>
                    </div>
                </div>
                <div className="dexfund-value">
                    <span className="dexfund-value-price">{new Intl.NumberFormat().format(Math.ceil(fund.currentAUM))}</span>
                    <span className="dexfund-price-source">{'Market Cap'}</span>
                </div>
            </div>
            <div className="dexfund-card-body">
                <div className="dexfund-detailed-info" onClick={() => {toPage(`/fund/${fund.id}`)}}>
                    <div className="users">
                        <span className="title">Users</span>
                        <span className="value">{new Intl.NumberFormat().format(fund.investmentCount)}</span>
                    </div>
                    <div className="risk">
                        <span className="title">Risk</span>
                        <span className="value">0</span>
                    </div>
                    <div className="min-investment">
                        <span className="title">Min Investment</span>
                        <span className="value">{new Intl.NumberFormat().format(policy ? policy.minInvestmentAmount: '-')}</span>
                    </div>
                    <div className="age">
                        <span className="title">Age</span>
                        <span className="value">{formatDistance(new Date(parseInt(fund.inception) * 1000), new Date(), { addSuffix: false })}</span>
                    </div>
                    <div className="holding">
                        <span className="title">Biggest Holding</span>
                        <span className="value">
                            {
                                biggestHolding  ? (
                                    <>
                                        <img src={getIconSource(biggestHolding.symbol)} alt="" className="coin-avatar" />
                                        {
                                            biggestHolding.symbol && biggestHolding.percentage && (
                                                <span>{biggestHolding.percentage.toFixed(2)}%</span>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>--</>
                                )
                            }
                        </span>
                    </div>
                </div>
                <div className="chart-container">
                    <DexfundChart width={250} height={220} ethPrice={ethPrice} fundAddress={fund ? fund.id : undefined} parentState={props} fundName={fund ? fund.fundName : ''} walletMust={false} currentSharePrice={currentSharePrice}/>
                </div>
            </div>
        </div>
        </RoundCard>
    )
}

export default DexFundCard;