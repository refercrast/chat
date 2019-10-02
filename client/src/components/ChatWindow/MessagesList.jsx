import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import MessageItem from "./MessageItem";
import { socket } from "../../services/socket";

class MessagesList extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    componentDidMount() {
        this.setState({ messages: this.props.messages.messages});
        socket.on("USER_HAS_JOINED_CHANNEL", (username, channelId) => {
            // this.setState({ messages: this.state.messages.concat({ _id:'1223', message: 'asdad', ownerName: 'asdwqewqe' }) });
            console.log(username, channelId)
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.setState({ messages: this.props.messages.messages});
        console.log(this.state.messages)
    }

    render() {

        return (
            <ul>
                { !this.props.messages.isLoading && this.state.messages.map(message => <MessageItem message={message} key={message._id}/>) }
            </ul>
        )
    }
}

export default connect(store => ({
    messages: store.messages
}),{})(MessagesList)