import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { togglePageAction } from "../store/actions";
import AddChannelForm from "./AddChannelForm";
import { TOGGLE_MENU, TOGGLE_ADD_CHANNEL } from "../store/actionTypes";
import { getCurrentActionState } from "../selectors/pageActionsSelector";
import { logout } from "../store/actions";

class LeftMenu extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleCloseMenu = () => {
        this.props.togglePageAction(TOGGLE_MENU, false);
    };

    handleNewChannel = () => {
        this.props.togglePageAction(TOGGLE_MENU, false);
        this.props.togglePageAction(TOGGLE_ADD_CHANNEL, true);
    };

    handleLogout = () => {
        this.props.logout();
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

const mapStateToProps = () => {
    const getCurrentAction = getCurrentActionState();

    return (store) => {
        return {
            showMenu: getCurrentAction(store, TOGGLE_MENU),
            username: store.auth.user.username
        }
    }
};

export default connect(mapStateToProps,{ togglePageAction, logout })(LeftMenu)
