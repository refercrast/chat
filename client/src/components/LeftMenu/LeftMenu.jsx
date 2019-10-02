import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { toggleMenu, toggleAddChannel } from "../../store/actions";
import AddChannelForm from "./AddChannelForm";
import { logout } from "../../store/actions";

class LeftMenu extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleCloseMenu = () => {
        this.props.toggleMenu(false);
    };

    handleNewChannel = () => {
        this.props.toggleMenu(false);
        this.props.toggleAddChannel(true);
    };

    handleLogout = () => {
        this.props.logout();
        this.props.toggleMenu(false);
    };

    render() {
        return(
            <Fragment>
                <div
                    onClick={this.handleCloseMenu}
                    className={classNames({
                        "menu-modal": true,
                        "show": this.props.showMenu
                    })}
                >
                </div>
                {/*To-do need create new component*/}
                <div className={classNames({
                         "menu-wrapper": true,
                         "show": this.props.showMenu
                     })}
                >
                    <div className='menu-top'>
                        {/*temporary avatar. Need to create new component*/}
                        <div className="menu avatar">
                            {/*<img alt="channel-avatar"/>*/}
                        </div>
                        <div className="menu-user-info">
                            <div className="menu-username">
                                {this.props.username}
                            </div>
                        </div>
                    </div>
                    <div className='menu-body'>
                        <div onClick={this.handleNewChannel} className="menu-item">
                            <div className="menu-item-icon">
                                <i className="fas fa-bullhorn"></i>
                            </div>
                            <div className="menu-item-title">New channel</div>
                        </div>
                        <div onClick={this.handleLogout} className="menu-item">
                            <div className="menu-item-icon">
                                <i className="fas fa-sign-out-alt"></i>
                            </div>
                            <div className="menu-item-title">Logout</div>
                        </div>
                    </div>
                    {/*temporary*/}
                    <div className='menu-footer'>

                    </div>
                </div>
                <AddChannelForm />
            </Fragment>

        )
    }
}

export default connect(store => ({ showMenu: store.toggleMenu, username: store.auth.user.username }),{ toggleMenu, toggleAddChannel, logout })(LeftMenu)
