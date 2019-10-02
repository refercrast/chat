import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { toggleMenu } from "../../store/actions";


class BurgerMenu extends PureComponent{
    constructor(props) {
        super(props)
    }

    handleClick = () => {
      this.props.toggleMenu(true);
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
}),{ toggleMenu })(BurgerMenu)