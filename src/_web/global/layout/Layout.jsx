import { useState } from "react";
import CardContainer from "../CardContainer/CardContainer"
import Header from "../header/Header"
import SettingsPopup from "../settings-popup/SettingsPopup";
import './Layout.css';

const Layout = (props) => {
    const [settingsPopup, setSettingsPopup] = useState(false);

    const displaySettingsPopup = () => {
        setSettingsPopup(true);
    };
    const closeSettingsPopup = () => {
        setSettingsPopup(false);
    };
    const doNotDisplay = {
        display: "none",
    };
    return (
        <CardContainer>
          <Header
            {...props}
            displaySettingsPopupEvent={displaySettingsPopup}
          />
            <div className="page-content">
                {props.children}
            </div>
          <div style={settingsPopup === false ? doNotDisplay : {}}>
            <SettingsPopup
              {...props}
              closeSettingsPopupEvent={closeSettingsPopup}
            />
          </div>
        </CardContainer>
    )
}

export default Layout;