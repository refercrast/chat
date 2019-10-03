import React, { Fragment, PureComponent } from 'react';
import { connect } from "react-redux";
import classnames from "classnames";

class MessageItem extends PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        return <Fragment>
            {this.props.message.messageType === 'user' &&
            <li className={classnames({
                "message-item": true,
                "my-message": this.props.currentUserId === this.props.message.ownerId
            })}
            >
                {/*temporary avatar. Need to create new component*/}
                <div className="message avatar">
                    {/*<img alt="channel-avatar"/>*/}
                </div>

                <div className="message-container">
                    <div className="message-author">{this.props.message.ownerName}</div>
                    <div className="message-data">{this.props.message.message}</div>
                </div>
            </li>
            }
            {this.props.message.messageType === 'channelAction' &&
            <li className="message-item-action">
                <span className="message-data-action">{this.props.message.message}</span>
            </li>
            }
            </Fragment>
    }
}

export default connect(store => ({
    currentUserId: store.auth.user._id
}),{})(MessageItem)