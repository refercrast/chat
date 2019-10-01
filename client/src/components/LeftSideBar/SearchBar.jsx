import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import BurgerMenu from "./BurgerMenu";
import { getChannels } from "../../store/actions";
import SearchBarItem from "./SearchBarItem";
import classnames from "classnames";
import { TOGGLE_SEARCH_RESULT } from "../../store/actionTypes";
import { togglePageAction } from "../../store/actions";
import { getCurrentActionState } from "../../selectors/pageActionsSelector";

class SearchBar extends PureComponent{
    constructor(props) {
        super(props);

        this.state = {
            channels: [],
            filterResult: [],
            searchInput: ''
        }
    }

    handleFocusInput = () => {
        if (this.state.searchInput === '') {
            this.props.getChannels().then( () => {
                this.setState({
                    channels: this.props.channels.channels,
                    filterResult: this.props.channels.channels
                });
                this.props.togglePageAction(TOGGLE_SEARCH_RESULT, true);
            });
        }
    };

    handleChange = (e) => {
        if (e.target.value === '') {
            this.props.togglePageAction(TOGGLE_SEARCH_RESULT, false);
        } else {
            this.props.togglePageAction(TOGGLE_SEARCH_RESULT, true);
        }

        this.setState({
            searchInput: e.target.value,
            filterResult: this.state.channels.filter(channel => channel.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 )
        });
    };

    render() {
        return (
           <div className="search-bar">
               <BurgerMenu />
               <div className="search-field">
                   <input
                       onFocus={this.handleFocusInput}
                       type="text"
                       placeholder="Search"
                       onChange={this.handleChange}
                       value={this.state.searchInput}
                   />
                   <ul className={classnames({
                           "search-bar-result": true,
                           "show": this.props.showSearchResult
                       })}>
                       {this.state.filterResult.map(channel => <SearchBarItem key={channel._id} channel={channel}/>)}
                       {!this.state.filterResult.length && <span>not found</span>}
                   </ul>
               </div>
           </div>
        )
    }
}

const mapStateToProps = () => {
    const getCurrentAction = getCurrentActionState();

    return (store) => {
        return {
            showSearchResult: getCurrentAction(store, TOGGLE_SEARCH_RESULT),
            channels: store.channels
        }
    }
};

export default connect(mapStateToProps,{ getChannels, togglePageAction })(SearchBar)