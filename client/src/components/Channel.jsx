import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { deleteChannel } from "../store/actions/channel";

class Channel extends PureComponent{
    constructor(props) {
        super(props)
    }

    handleDelete = () => {
        this.props.deleteChannel(this.props.channel._id);
    };

    render() {
        return (
            <li>
                {
                    this.props.currentUserId === this.props.channel.ownerId &&
                    <button onClick={this.handleDelete} className='delete-channel-button'/>
                }
                {this.props.channel.title}
            </li>
        )
    }
}

export default connect(store => ({
    currentUserId: store.auth.user._id
}),{ deleteChannel })(Channel)