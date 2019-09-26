import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Channel from "./ChannelItem";
import { getChannels } from "../../store/actions";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

class ChannelsList extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getChannels();
        socket.on('NEW_CHANNEL', () => {
            this.props.getChannels();
        });
        socket.on('DELETE_CHANNEL', () => {
            this.props.getChannels();
        });
    }

    render() {
        return (
            <div className="channel-list-wrapper">
                <ul className="channel-list">
                    { this.props.channels.channels.map(channel => <Channel history={this.props.history} key={channel._id} channel={channel}/>) }
                </ul>
            </div>
        )
    }
}

export default connect(store => ({
    channels: store.channels
}),{ getChannels })(ChannelsList);