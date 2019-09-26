import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import MessagesList from "./MessagesList";

class ChatWindow extends PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="channel-window">
                <div className="channel-window-header">

                </div>
                <div className="channel-window-body">
                    <MessagesList />
                </div>
                <div className="channel-window-input">

                </div>
            </div>
    }
}

export default connect(store => ({
}),{})(ChatWindow)