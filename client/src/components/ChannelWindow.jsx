import React, { PureComponent } from 'react';
import { connect } from "react-redux";

class ChannelWindow extends PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>To-do</div>
        )
    }
}

export default connect(store => ({}),{})(ChannelWindow)