import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { socket } from "../../services/socket";

class SearchBarItem extends PureComponent{
    constructor(props) {
        super(props);
    }

    handleJoin = () => {
        socket.emit('NEW_USER_CHANNEL', this.props.currentUserName, this.props.channel._id);
    };

    render() {
        return (
            <li>
                <div className='search-bar-item'>
                    <span>{this.props.channel.title}</span>
                    <div className="search-bar-result-button">
                        <button onClick={this.handleJoin}>Join</button>
                    </div>
                </div>
            </li>
        )
    }
}

export default connect(store => ({ currentUserName: store.auth.user.username }),{})(SearchBarItem)