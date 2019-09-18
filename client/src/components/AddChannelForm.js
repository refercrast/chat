import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createChannel } from "../store/actions/channel";
import { CREATE_CHANNEL } from "../store/actionTypes";

class AddChannelForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            channelTitle: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        const { socket } = this.props;
        e.preventDefault();
        socket.emit(CREATE_CHANNEL, this.state.channelTitle, this.props.createChannel);
        this.setState({ channelTitle: '' });
    };

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit} action="submit">
                    <input
                        type="text"
                        name='channelTitle'
                        onChange={this.handleChange}
                        value={this.state.channelTitle}
                    />
                    <button type="submit">Add channel</button>
                </form>
            </div>
        )
    }
}

export default connect(store => ({}),{createChannel})(AddChannelForm)
