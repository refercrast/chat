import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Channel from "./Channel";
import { getChannels } from "../store/actions";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

class ChannelsList extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getChannels();
        socket.on('CHANNEL_UPDATE', () => {
            this.props.getChannels();
        });
    }

    render() {
        return (
            <div className="channel-list-wrapper">
                <ul className="channel-list">
                    { this.props.channels.channels.map(channel => <Channel key={channel._id} channel={channel}/>) }
                </ul>
            </div>
        )
    }
}

export default connect(store => ({
    channels: store.channels
}),{ getChannels })(ChannelsList);