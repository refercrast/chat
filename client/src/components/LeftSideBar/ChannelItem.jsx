import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { deleteChannel, setDisplayedChannel } from "../../store/actions/channel";
import classnames from "classnames";
import { getMessages } from "../../store/actions";

class ChannelItem extends PureComponent{
    constructor(props) {
        super(props)
    }

    handleDelete = () => {
        this.props.deleteChannel(this.props.channel._id);
    };

    handleSelect = () => {
        this.props.setDisplayedChannel(this.props.channel._id, this.props.channel.title);
        this.props.getMessages(this.props.channel._id);
    };

    render() {
        return (
            <li onClick={this.handleSelect} className={classnames({
                "active": this.props.displayedChannel.id === this.props.channel._id
            })}>
                {
                    this.props.currentUserId === this.props.channel.ownerId &&
                    <button onClick={this.handleDelete} className='delete-channel-button'/>
                }
                {/*temporary avatar. Need to create new component*/}
                <div className="channel avatar">
                    {/*<img alt="channel-avatar"/>*/}
                </div>
                <div className="channel-info">
                    <div className="channel-type"></div>
                    <div className="channel-title">{this.props.channel.title}</div>
                    <div className="channel-last-message-wrapper">
                        <span className="channel-last-message-author">TestAuthor:</span>
                        <span className="channel-last-message">Test last message</span>
                    </div>
                </div>
            </li>
        )
    }
}

export default connect(store => ({
    currentUserId: store.auth.user._id,
    displayedChannel: store.displayedChannel
}),{ deleteChannel, setDisplayedChannel, getMessages })(ChannelItem)