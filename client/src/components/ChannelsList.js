import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { setChannels } from "../store/actions";
import Channel from "./Channel";
import { GET_CHANNELS } from "../store/actionTypes";


class ChannelsList extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { socket } = this.props;
        socket.emit(GET_CHANNELS, this.props.setChannels);
    }

    render() {
        const { channels } = this.props.channels;
        return (
            <Fragment>
                {channels.length &&
                    channels.map(channel => <Channel key={channel._id} title={channel.title}/>)
                }
            </Fragment>
        )
    }
}

export default connect(store => ({
    channels: store.channels
}),{ setChannels })(ChannelsList);