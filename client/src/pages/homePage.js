import React, { PureComponent, Fragment } from 'react';
import ChannelsList from '../components/ChannelsList';
import AddChannelForm from "../components/AddChannelForm";
import io from "socket.io-client";
import { GET_CHANNELS } from "../store/actionTypes";
import {connect} from "react-redux";
import {setChannels} from "../store/actions";

const socketUrl = 'http://localhost:4000';

class HomePage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            socket: null
        }
    }

    componentDidMount() {
        this.initSocket();
    }

    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('Connected');
        });
        this.setState({ socket });
    };

    render() {
        return (
            <div>
                <ChannelsList socket={this.state.socket} />
                <AddChannelForm socket={this.state.socket} />
            </div>
        )
  }
}

export default connect(store => ({}),{ setChannels })(HomePage);
