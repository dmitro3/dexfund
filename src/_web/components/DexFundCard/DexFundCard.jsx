import { useEffect, useState } from 'react';
import { getTopAsset } from '../../../ethereum/funds/fund-related';
import Chart1D from '../../global/portfolio/components/Chart1D';
import Portfolio from '../../global/portfolio/Portfolio';
import DexfundChart from '../DexfundChart/DexfundChart';
import RoundCard from '../RoundCard/RoundCard';
import avatar from './avatar.png'
import './DexFundCard.css';
import {format, formatDistance, subDays} from 'date-fns';
import { minMaxDepositAmounts } from '../../../sub-graph-integrations';
import { useHistory } from 'react-router-dom';
import { getIconSource } from '../../../icons';

const DexFundCard = (props) => {
    const {fund} = props; 
    const [biggestHolding, setBiggestHolding] = useState({});
    const [policy, setPolicy] = useState({});
    const history = useHistory();

    useEffect(() => {
        const topAsset = getTopAsset(fund);
        (async () => {
            const policy = await minMaxDepositAmounts(fund.id);
            setPolicy(policy);
        })()
        
        setBiggestHolding(topAsset);
    }, [props]);

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
                        <span className="value">3</span>
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
                                (biggestHolding && biggestHolding.symbol && biggestHolding.percentage) ? (
                                    <>
                                        <img src={getIconSource(biggestHolding.symbol)} alt="" className="coin-avatar" />
                                        <span>{biggestHolding.percentage.toFixed(2)}</span>%
                                    </>
                                ) : (
                                    <>--</>
                                )
                            }
                        </span>
                    </div>
                </div>
                <div className="chart-container">
                    <DexfundChart width={250}/>
                </div>
            </div>
        </div>
        </RoundCard>
    )
}

export default DexFundCard;