import ChartComponent from "../../fund-details-page/overview/components/portfolio/components/ChartComponent";

const PriceFeedChart = (props) => {
    return (
        <ChartComponent height={props.height} width={props.width} ethPrice={props.ethPrice} data={props.selectedData} loading={props.loading} noData={props.noData} fundName={props.fundName}/>
    );
}

export default PriceFeedChart;