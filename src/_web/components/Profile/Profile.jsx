import { ThreeDots } from 'react-bootstrap-icons';
import RoundCard from '../RoundCard/RoundCard';
import './Profile.css';
import avatar from '../DexFundCard/avatar.png';
import DexfundRoundChart from '../DexFundRoundChart/DexFundRoundChart';
import DexfundChart from '../DexfundChart/DexfundChart';
import DexFundCard from '../DexFundCard/DexFundCard';
import { useEffect, useState } from 'react';
import { getOnboardInformation } from '../../../redux/reducers/OnboardReducer';
import { getConnectInformation } from '../../../redux/reducers/AccountConnectReducer';
import { useDispatch, useSelector } from 'react-redux';
import { allFundTransactions, getAllInvestments, getYourInvestments } from '../../../sub-graph-integrations';
import { getEthPrice, getStartAUM } from '../../../ethereum/funds/fund-related';
import { getAllCreationSharePrices } from '../../../api/vaults';
import configs from '../../../config';
import { activateLoaderOverlay, deactivateLoaderOverlay } from '../../../redux/actions/LoaderAction';

const Profile = (props) => {
    const onboard = useSelector(state => getOnboardInformation(state));
    const account = useSelector(state => getConnectInformation(state));
    const [myInvestments, setMyInvestments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ethPrice, setEthPrice] = useState(0);
    const dispatch = useDispatch();
    const [myTotalAUM, setMyTotalAUM] = useState(0);
    const [biggestFund, setBiggestFund] = useState(undefined);
    const [bestFund, setBestFund] = useState(undefined);
    const [totalIncreasePercent, setTotalIncreasePercent] = useState(0);
    const [weekIncreasePercent, setWeekIncreasePercent] = useState(0);
    const [splitAUM, setSplitAUM] = useState([]);

    const calculateAUM = (fund) => {
        let AUM = 0
        fund.portfolio.holdings.forEach(holding => {
          const amount = parseFloat(holding.amount) *  parseFloat(holding.asset.price.price)
          AUM += amount
        });
    
        return AUM
    }
    
     const calculateCurrentSharePrice = (investment, aum) => {
        const shareSupply = parseFloat(investment.shares.totalSupply);
        const sharePrice = parseFloat(aum) * ethPrice / shareSupply;
    
        return !Number.isNaN(sharePrice) ? sharePrice : 0;
      }
    
    const calculateLifetimeReturn = (investment, aum, ccsp) => {
        if (!Object.keys(ccsp).includes(investment.id.toLowerCase()))
          return 0;
        const csp = calculateCurrentSharePrice(investment, aum);
        if (csp == 0)
          return 0;
    
        const creationSP = ccsp[investment.id.toLowerCase()];
        var ltr;
        var profit = csp - creationSP;
        ltr = (profit / creationSP) * 100;
        return ltr;
    }

    useEffect(() => {
        (async () => {
            if (onboard) {
                dispatch(activateLoaderOverlay())

                const _ethPrice = await getEthPrice();
                setEthPrice(_ethPrice);

                var yourInvestments = await getYourInvestments(
                    onboard.address
                );
                console.log('your investment: ', yourInvestments);
                var yourFunds = yourInvestments.map(investment => investment.fund) || [];
                const allFundTx = [];

                yourFunds.map((fund) => {
                    (async () => {
                        allFundTx.push(await allFundTransactions(fund.id) || []); 
                    })();
                });


                setIsLoaded(false);
                var creationSharePrices = await getAllCreationSharePrices();
                console.log('allfundTX: ', allFundTx)
                //yourInvestments = await getAllInvestments();
                const aums = allFundTx.map(fundTx => {
                    let priceArrayPerFund =  fundTx.map(tx => {
                        const amount = parseFloat(tx.amount) || 0;
                        const sign = tx.type === 'INVEST' ? 1: -1;
                        const price = parseFloat(tx.price) || 0;
                        return {
                            AUM: sign * amount * price * _ethPrice,
                            fundName: tx.fundName,
                            fundId: tx.fundId
                        };
                    });

                    let sum = 0;
                    priceArrayPerFund.map(r => {
                        sum += r.AUM;
                    });

                    return {
                        fundName: priceArrayPerFund[0].fundName,
                        fundAddress: priceArrayPerFund[0].fundId,
                        AUM: sum
                    }
                });

                console.log('AUMS: ', aums);
                
                let _total = 0;
                for (var a of aums) {
                    _total += a.AUM;
                }
                console.log('total aum: ', _total);
                setMyTotalAUM(_total);
                
                setSplitAUM(aums);

                if (yourInvestments && yourInvestments.length > 0) {
                    const startAUM = await getStartAUM(onboard.address, yourInvestments[0].investor.investorSince, _ethPrice);
                    const weekAgoTime = Math.ceil(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000);
                    const weekAgoAUM = await getStartAUM(onboard.address, weekAgoTime, _ethPrice);
                    setTotalIncreasePercent((100 + parseFloat((_total - startAUM) * 100) / (startAUM || 1)).toFixed(2));
                    if (weekAgoTime < parseInt(yourInvestments[0].investor.investorSince)) {
                        setWeekIncreasePercent((100 + parseFloat((_total - weekAgoAUM) * 100) / (weekAgoAUM || 1)).toFixed(2));
                    } else {
                        setWeekIncreasePercent('--');
                    }
                } else {
                    setTotalIncreasePercent('--');
                    setWeekIncreasePercent('--');
                }

                yourFunds = yourFunds.filter((v) => {
                    return !configs.BLACKLISTED_VAULTS.includes(v.id.toLowerCase());
                });

                console.log('your funds: ', yourFunds);

                for(var i = 0; i < yourFunds.length; i++) {
                    yourFunds[i].currentAUM = calculateAUM(yourFunds[i]);
                    yourFunds[i].ltr = calculateLifetimeReturn(yourFunds[i], yourFunds[i].currentAUM, creationSharePrices);
                }
                yourFunds.sort((a, b) => {
                    if (a.currentAUM < b.currentAUM)
                    return 1;
                    else if(a.currentAUM > b.currentAUM)
                    return -1;
                    else
                    return 0;
                });
                setBiggestFund(yourFunds[0]);
                setMyInvestments(yourFunds);

                yourFunds.sort((a, b) => {
                    if (a.ltr < b.ltr)
                    return 1;
                    else if(a.ltr > b.ltr)
                    return -1;
                    else
                    return 0;
                });

                setBestFund(yourFunds[0]);
                setIsLoaded(true);
                dispatch(deactivateLoaderOverlay());

            }
        })()
        
    }, [onboard])
    return (
        <div className="profile-container">
            <div className="profile-overview">
                <div className="profile-overview-element">
                    <RoundCard width="100%">
                        <div className="overview-card">
                            <div className="overview-card-header">
                                <h4 className="overview-title">Total AUM</h4>
                                <ThreeDots color={'black'} size={24}/>
                            </div>
                            <div className="overview-card-body">
                                <div className="overview-detail">
                                    <div className="overview-detail-row">
                                        <span className="subject">Total AUM</span>
                                        <span className="subject-value">${parseFloat(myTotalAUM).toFixed(2)}</span> 
                                    </div>
                                    <div className="overview-detail-row">
                                        <span className="subject">7 Day %</span>
                                        <span className="subject-value">{weekIncreasePercent}%</span> 
                                    </div>
                                    <div className="overview-detail-row">
                                        <span className="subject">Total %</span>
                                        <span className="subject-value">{totalIncreasePercent}%</span> 
                                    </div>
                                </div>
                                <div className="fund-titles">
                                    {
                                        biggestFund && (
                                        <a className="fund-title-row" href={`https://bscscan.com/address/${biggestFund.id}`} target="_blank">
                                            <img src={avatar} alt="" className="fund-title-row-avatar" />
                                            <span className="fund-title-row-name">{biggestFund.name}</span>
                                            <span>- Biggest Dexfund</span>
                                        </a>
                                        )
                                    }
                                    {
                                        bestFund && (
                                            <a className="fund-title-row" href={`https://bscscan.com/address/${bestFund.id}`} target="_blank">
                                                <img src={avatar} alt="" className="fund-title-row-avatar" />
                                                <span className="fund-title-row-name">{bestFund.name}</span>
                                                <span>- Best Dexfund</span>
                                            </a>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </RoundCard>
                </div>
                <div className="profile-overview-element">
                    <RoundCard width="100%">
                        <div className="overview-card">
                            <div className="overview-card-header">
                                <h4 className="overview-title">Dexfund Split</h4>
                                <ThreeDots color={'black'} size={24}/>
                            </div>
                            
                            <div className="overview-card-body">
                                {
                                    splitAUM && splitAUM.length > 0 ? (
                                        <DexfundRoundChart values={splitAUM}/>
                                    ) : (
                                        <div className="profile-empty-card-wrapper">
                                            No Dexfunds Available
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </RoundCard>
                </div>
                <div className="profile-overview-element">
                    <RoundCard width="100%">
                        <div className="overview-card">
                            <div className="overview-card-header">
                                <h4 className="overview-title">Total ROL</h4>
                                <ThreeDots color={'black'} size={24}/>
                            </div>
                            <div className="overview-card-body">
                                <DexfundChart outline={false} width={350} yLabel={true}/>
                            </div>
                        </div>
                    </RoundCard>
                </div>
            </div>
            <h3 className="title">My Dexfunds</h3>
            <div className="profile-overview">
                {
                   myInvestments.length > 0 ? myInvestments.map((fund, index) => (
                        <DexFundCard fund={fund} key={index}/>
                    )) : (
                        <div className="fund-empty-card-wrapper">
                            No Dexfunds Available
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Profile;