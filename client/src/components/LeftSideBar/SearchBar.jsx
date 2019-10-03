import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import BurgerMenu from "./BurgerMenu";
import { getChannels } from "../../store/actions";
import SearchBarItem from "./SearchBarItem";
import classnames from "classnames";
import { toggleSearchResult } from "../../store/actions";

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
                this.props.toggleSearchResult(true);
            });
        }
    };

    handleChange = (e) => {
        if (e.target.value === '') {
            this.props.toggleSearchResult(false);
        } else {
            this.props.toggleSearchResult(true);
        }

        this.setState({
            searchInput: e.target.value,
            filterResult: this.state.channels.filter(channel => channel.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 )
        });
    };

    handleClear = () => {
        this.setState({ searchInput: '' });
        this.props.toggleSearchResult(false);
    };

    render() {
        return (
           <div className="search-bar">
               <BurgerMenu />
               <div className="search-field">
                   <div>
                       <input
                           onFocus={this.handleFocusInput}
                           type="text"
                           placeholder="Search"
                           onChange={this.handleChange}
                           value={this.state.searchInput}
                       />
                       {this.props.showSearchResult &&
                       <button onClick={this.handleClear} className='clear-search-button'/>
                       }
                   </div>
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


export default connect(store => ({ showSearchResult: store.toggleSearchResult, channels: store.channels }),{ getChannels, toggleSearchResult })(SearchBar)