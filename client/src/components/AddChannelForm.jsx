import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addNewChannel } from "../store/actions/channel";

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
        e.preventDefault();
        this.setState({ channelTitle: '' });
        this.props.addNewChannel({ title: this.state.channelTitle });
    };

    render() {
        return(
            <div className='channel-form'>
                <form onSubmit={this.handleSubmit} >
                    <input
                        type="text"
                        name='channelTitle'
                        onChange={this.handleChange}
                        value={this.state.channelTitle}
                    />
                    <button className="channel-button" type="submit">Add channel</button>
                </form>
            </div>
        )
    }
}

export default connect(store => ({}),{ addNewChannel })(AddChannelForm)
