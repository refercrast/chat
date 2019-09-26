import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import BurgerMenu from "./BurgerMenu";

class SearchBar extends PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        return (
           <div className="search-bar">
               <BurgerMenu />
               <div className="search-field">
                   <input type="text" placeholder="Search"/>
               </div>
           </div>
        )
    }
}

export default connect(store => ({
}),{})(SearchBar)