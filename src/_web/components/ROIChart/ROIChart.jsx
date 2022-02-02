import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEthPrice } from "../../../ethereum/funds/fund-related";
import { getOnboardInformation } from "../../../redux/reducers/OnboardReducer";
import { getFirstSeenForInvestor, getTotalAUM, getYourInvestmentsTillDate, getYourWithdrawTillDate } from "../../../sub-graph-integrations";
import CommonChart from '../CommonChart/CommonChart';
const { useEffect } = require("react");

const ROIChart = (props) => {
    const [firstSeen, setFirstSeen] = useState(new Date().getTime());
    const [times, setTimes] = useState([]);
    const [ROIs, setROIs] = useState([]);
    const [ethPrice, setEthPrice] = useState(0);
    const dispatch = useDispatch();
    const onboard = useSelector(state => getOnboardInformation(state));
    useEffect(() => {
        (async () => {
            const _etherPrice = await getEthPrice();
            setEthPrice(_etherPrice);
            const _firstSeen = await getFirstSeenForInvestor(onboard.address);
            if (_firstSeen) {
                setFirstSeen(_firstSeen.firstSeen);
                let now = new Date().getTime() / 1000;
                let _times = [];
                let totalAUM = await getTotalAUM(onboard.provider, onboard.address);
                console.log('roi_aum: ', totalAUM);
                let _rois = [];
                let startTime = parseInt(_firstSeen.firstSeen);
                for (let i = startTime ; i <= now ; i += 86400) {
                    _times.push(i);
                    const _investments = await getYourInvestmentsTillDate(onboard.address, i);
                    const _redeems = await getYourWithdrawTillDate(onboard.address, i);
                    let totalInvestment = 0;
                    if (_investments && _investments.investments) {
                        totalInvestment = _investments.investments.reduce((a,b) => {
                            return a + parseFloat(b.investmentAmount) * parseFloat(b.asset.price.price) * _etherPrice;
                        }, 0);
                    }
                    let totalRedeems = 0;
                    if (_redeems && _redeems.redeems) {
                        totalRedeems = _redeems.redeems.reduce((a, b ) => {
                            return a + b.payoutAssetAmounts.reduce((c, d) => {
                                return c + parseFloat(d.amount) * parseFloat(d.price.price) * _etherPrice;
                            }, 0)
                        }, 0);
                    }
                    console.log('roi_invest_withdraw: ', totalInvestment, totalRedeems)
                    if (totalInvestment) {
                        let roi = (totalAUM + totalRedeems - totalInvestment).toFixed(5) / totalInvestment * 100;
                        _rois.push(roi);
                    } else {
                        _rois.push(0);
                    }
                }
                setTimes(_times);
                setROIs(_rois);
                console.log('ROI: ', _times, _rois);
            }
            
        })();
    }, onboard.provider)
    return (
        <CommonChart xValues={times} yValues={ROIs} outline={props.outline} width={props.width} yLabel={props.yLabel}/>
    );
}

export default ROIChart;