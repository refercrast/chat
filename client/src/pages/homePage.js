import React, { PureComponent } from 'react';
import ChannelsList from '../components/ChannelsList';
import AddChannelForm from "../components/AddChannelForm";
import ChannelWindow from "../components/ChannelWindow";
import { connect } from "react-redux";

class HomePage extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <section className="chat">
                    <div className="channel-window">
                        <ChannelWindow />
                    </div>
                    <div className="right-sidebar">
                        <AddChannelForm  />
                        <ChannelsList />
                    </div>
                </section>
            </div>
        )
  }
}

export default connect(store => ({}),{})(HomePage);
