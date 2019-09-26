import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { getMessages } from "../../store/actions";
import MessageItem from "./MessageItem";

class MessagesList extends PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul>
                { this.props.messages.messages.map(message => <MessageItem message={message} key={message._id}/>) }
            </ul>
        )
    }
}

export default connect(store => ({
    messages: store.messages
}),{})(MessagesList)