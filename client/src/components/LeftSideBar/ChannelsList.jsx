import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Channel from "./ChannelItem";
import { getUserChannels, getChannels } from "../../store/actions";

class ChannelsList extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUserChannels();
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

export default connect(store => ({channels: store.userChannels}),{ getUserChannels, getChannels })(ChannelsList);