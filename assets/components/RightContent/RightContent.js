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
                <DaySong
                    auth={this.props.auth}
                />
                <WhatsHappening />
                <ChatBox
                    auth={this.props.auth}
                />
                <Survey />
                <InformationBox />
            </div>
        );
    }
}


export default RightContent;