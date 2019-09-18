import React, { PureComponent } from 'react';
import { connect } from "react-redux";

class Channel extends PureComponent{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>{this.props.title}</div>
        )
    }
}

export default connect(store => ({}),{})(Channel)