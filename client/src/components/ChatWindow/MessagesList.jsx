import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import MessageItem from "./MessageItem";
import { socket } from "../../services/socket";

class MessagesList extends PureComponent{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        socket.on("USER_HAS_JOINED_CHANNEL", () => {
            console.log('updated')
        });
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