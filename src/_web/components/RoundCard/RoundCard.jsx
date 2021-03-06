// import './RoundCard.css';
import { useState } from 'react';
import style from './style.js';

const RoundCard = (props) => {
    const [hover, setHover] = useState(false);
    const isMobile = window.innerWidth < 768;
    return (
        <div className="round-card-container" 
        onMouseEnter={()=>{
            if (props.flatable) {
                setHover(true);
            }
          }}
          onMouseLeave={()=>{
            setHover(false);
          }}
        style={{
            width: props.width || (isMobile ? '100%' : 'fit-content'),
            ...style.normal,
            ...(hover ? style.hover : null)
        }}>
            {props.children}
        </div>
    );
}

export default RoundCard;