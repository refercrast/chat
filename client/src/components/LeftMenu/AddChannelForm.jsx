import React, { Fragment, PureComponent } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addNewChannel } from "../../store/actions/channel";
import { getCurrentActionState } from "../../selectors/pageActionsSelector";
import { TOGGLE_ADD_CHANNEL } from "../../store/actionTypes";
import { togglePageAction } from "../../store/actions";

class AddChannelForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            channelTitle: ''
        }
    }

    handleChange = (e) => {
        if (e.keyCode === 13) {
            this.setState({ channelTitle: '' });
            this.props.addNewChannel({ title: this.state.channelTitle });
        }
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCreate = e => {
        e.preventDefault();
        this.setState({ channelTitle: '' });
        this.props.addNewChannel({ title: this.state.channelTitle });
    };

    handleClose = () => {
        this.props.togglePageAction(TOGGLE_ADD_CHANNEL, false);
    };

    render() {
        return(
            <Fragment>
                <div onClick={this.handleClose} className={classnames({
                        "channel-form-overlay": true,
                        "show": this.props.showAddChannel
                    })}
                >
                </div>
                <div
                    className={classnames({
                        "channel-form": true,
                        "show": this.props.showAddChannel
                    })}
                >
                    {/*temporary avatar. Need to create new component*/}
                    <div className="menu avatar">
                        {/*<img alt="channel-avatar"/>*/}
                    </div>
                    <div className="add-channel-form">
                        <input
                            type="text"
                            name='channelTitle'
                            onKeyDown={this.handleChange}
                            onChange={this.handleChange}
                            value={this.state.channelTitle}
                            placeholder="Channel name"
                        />
                        <div className="add-channel-buttons">
                            <button onClick={this.handleClose} className="channel-button" type="submit">Cancel</button>
                            <button onClick={this.handleCreate} className="channel-button" type="submit">Create</button>
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}

const mapStateToProps = () => {
    const getCurrentAction = getCurrentActionState();

    return (store) => {
        return {
            showAddChannel: getCurrentAction(store, TOGGLE_ADD_CHANNEL)
        }
    }
};

export default connect(mapStateToProps,{ addNewChannel, togglePageAction })(AddChannelForm)