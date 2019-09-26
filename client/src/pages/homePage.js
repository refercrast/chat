import React, { PureComponent } from 'react';
import ChannelsList from '../components/LeftSideBar/ChannelsList';
import LeftMenu from "../components/LeftMenu/LeftMenu";
import SearchBar from "../components/LeftSideBar/SearchBar";
import ChannelWindow from "../components/ChatWindow/ChatWindow";
import { connect } from "react-redux";
import ErrorMessage from "../components/ErrorMessage";

class HomePage extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        // To-do add styles for error message
        return<div className='container'>
                { this.props.error.message &&
                    <ErrorMessage />
                }
                <section className='left-menu'>
                    <LeftMenu />
                </section>
                <section className="chat">
                    <div className="left-sidebar">
                        <SearchBar />
                        <ChannelsList history={this.props.history} />
                    </div>
                    <div className="channel-window">
                        <ChannelWindow />
                    </div>
                </section>
            </div>

  }
}

export default connect(store => ({ error: store.error }),{})(HomePage);
