import './CardContainer.css';

const CardContainer = (props) => {
    return (
        <div className="card-background-container">
            <div className="card-container">
                {props.children}
            </div>
        </div>
    )
}

export default CardContainer;