import { format } from 'date-fns';
import { getIconSource } from '../../../../../icons';
import './swapHistory.css';

const SwapHistory = (props) => {
    const swapHistory = props.swapHistory || [];
    return (
        <div className="history-wrapper">
            <div className="swap-history-header">
                <span className="history-no">No</span>
                <span className="history-date">Date</span>
                <span className="history-from">From</span>
                <span className="history-amount">Amount</span>
                <span className="history-to">To</span>
                <span className="history-amount">Amount</span>
                <span className="history-rate">Rate</span>
            </div>
            <div className="swap-history-body">
                {
                 (swapHistory && swapHistory.length > 0) ?  swapHistory.map((trade, index) => (
                        <div className="swap-history-row">
                            <span className="history-no">{index + 1}</span>
                            <span className="history-date">{format(new Date(parseInt(trade.timestamp) * 1000), 'yy-MM-dd')}</span>
                            <span className="history-from">
                                <img className="small-token-avatar" src={getIconSource(trade.outgoingAssetAmount.asset.symbol)}/>
                                {trade.incomingAssetAmount.asset.symbol}
                            </span>
                            <span className="history-amount">{parseFloat(trade.outgoingAssetAmount.amount).toFixed(2)}</span>
                            <span className="history-from">
                                <img className="small-token-avatar" src={getIconSource(trade.incomingAssetAmount.asset.symbol)}/>
                                {trade.outgoingAssetAmount.asset.symbol}
                            </span>
                            <span className="history-amount">{parseFloat(trade.incomingAssetAmount.amount).toFixed(2)}</span>
                            <span className="history-rate">{parseFloat(trade.incomingAssetAmount.amount / trade.outgoingAssetAmount.amount).toFixed(2)}</span>
                        </div>
                    )) : (
                        <span className="empty-view">
                            No trade history
                        </span>
                    )
                }
            </div>
        </div>
    )
}

export default SwapHistory;