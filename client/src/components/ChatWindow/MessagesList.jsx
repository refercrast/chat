import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import MessageItem from "./MessageItem";
import { socket } from "../../services/socket";
import { addMessage, getMessages } from "../../store/actions";

class MessagesList extends PureComponent{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        socket.on("USER_HAS_JOINED_CHANNEL", (username, channelId) => {
            this.props.addMessage(channelId, {
                message: `User ${username} has joined channel`,
                messageType: 'channelAction'
            }).then(() => {
                if (this.props.displayedChannel.id === channelId) {
                    this.props.getMessages(channelId);
                }
            })
        });
    }

    render() {
        return (
            <ul>
                {this.props.messages.messages.map(message => <MessageItem message={message} key={message._id}/>)}
            </ul>
        )
    }
}

export default connect(store => ({
    messages: store.messages,
    displayedChannel: store.displayedChannel
}),{ addMessage, getMessages })(MessagesList)