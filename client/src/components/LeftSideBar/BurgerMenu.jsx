import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { togglePageAction } from "../../store/actions";
import { TOGGLE_MENU } from "../../store/actionTypes";


class BurgerMenu extends PureComponent{
    constructor(props) {
        super(props)
    }

    handleClick = () => {
      this.props.togglePageAction(TOGGLE_MENU, true);
    };

    render() {
        return (
            <div onClick={this.handleClick} className="search-menu-button">
                <div className="search-menu-button-item"></div>
                <div className="search-menu-button-item"></div>
                <div className="search-menu-button-item"></div>
            </div>
        )
    }
}

export default connect(store => ({
}),{ togglePageAction })(BurgerMenu)