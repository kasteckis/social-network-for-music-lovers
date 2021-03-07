import React, {Component} from "react";
import DaySong from "./DaySong/DaySong";
import WhatsHappening from "./WhatsHappening/WhatsHappening";
import ChatBox from "./ChatBox/ChatBox";
import Survey from "./Survey/Survey";
import InformationBox from "./InformationBox/InformationBox";

class RightContent extends Component {
    render() {
        return (
            <div>
                <DaySong />
                <WhatsHappening />
                <ChatBox />
                <Survey />
                <InformationBox />
            </div>
        );
    }
}


export default RightContent;