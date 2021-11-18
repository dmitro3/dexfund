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
import { getAllInvestments, getYourInvestments } from '../../../sub-graph-integrations';
import { getEthPrice } from '../../../ethereum/funds/fund-related';
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

                const yourInvestments = await getYourInvestments(
                    onboard.address
                );
                setMyInvestments(yourInvestments);

                setIsLoaded(false);
                setEthPrice(await getEthPrice());
                var investments = await getAllInvestments();
                var creationSharePrices = await getAllCreationSharePrices();


                investments = investments.filter((v) => {
                    return !configs.BLACKLISTED_VAULTS.includes(v.id.toLowerCase());
                });
                for(var i = 0; i < investments.length; i++) {
                    investments[i].currentAUM = calculateAUM(investments[i]);
                    investments[i].ltr = calculateLifetimeReturn(investments[i], investments[i].currentAUM, creationSharePrices);
                }
                investments.sort((a, b) => {
                    if (a.currentAUM < b.currentAUM)
                    return 1;
                    else if(a.currentAUM > b.currentAUM)
                    return -1;
                    else
                    return 0;
                });
                // const investments = {}
                investments = investments.slice(0, 3);
                
                setMyInvestments(investments);
                setIsLoaded(true);
                dispatch(deactivateLoaderOverlay());

            }
        })()
        
    }, [onboard])
    return (
        <div className="profile-container">
            <div className="profile-overview">
                <RoundCard>
                    <div className="overview-card">
                        <div className="overview-card-header">
                            <h4 className="overview-title">Total AUM</h4>
                            <ThreeDots color={'black'} size={24}/>
                        </div>
                        <div className="overview-card-body">
                            <div className="overview-detail">
                                <div className="overview-detail-row">
                                    <span className="subject">Total AUM</span>
                                    <span className="subject-value">${new Intl.NumberFormat().format(12345)}</span> 
                                </div>
                                <div className="overview-detail-row">
                                    <span className="subject">7 Day %</span>
                                    <span className="subject-value">34%</span> 
                                </div>
                                <div className="overview-detail-row">
                                    <span className="subject">Total %</span>
                                    <span className="subject-value">142%</span> 
                                </div>
                            </div>
                            <div className="fund-titles">
                                <div className="fund-title-row">
                                    <img src={avatar} alt="" className="fund-title-row-avatar" />
                                    <span className="fund-title-row-name">{'Alt Queen'}'s{' '}</span>
                                    <span>Dexfund - Biggest Dexfund</span>
                                </div>
                                <div className="fund-title-row">
                                    <img src={avatar} alt="" className="fund-title-row-avatar" />
                                    <span className="fund-title-row-name">{'BlackRock'}'s</span>
                                    <span>Dexfund - Best Dexfund</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </RoundCard>
                <RoundCard>
                    <div className="overview-card">
                        <div className="overview-card-header">
                            <h4 className="overview-title">Dexfund Split</h4>
                            <ThreeDots color={'black'} size={24}/>
                        </div>
                        <div className="overview-card-body">
                            <DexfundRoundChart />
                        </div>
                    </div>
                </RoundCard>
                <RoundCard>
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
            <h3 className="title">My Dexfunds</h3>
            <div className="profile-overview">
                {
                    myInvestments.map((fund, index) => (
                        <DexFundCard fund={fund} key={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Profile;