import React, { PureComponent } from 'react';
import { connect } from "react-redux";

class SearchBarItem extends PureComponent{
    constructor(props) {
        super(props);
    }

    handleJoin() {

    }

    render() {
        return (
            <li>
                <div className='search-bar-item'>
                    <span>{this.props.channel.title}</span>
                    <div className="search-bar-result-button">
                        <button>Join</button>
                    </div>
                </div>
            </li>
        )
    }
}

export default connect(store => ({}),{})(SearchBarItem)