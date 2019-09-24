import React, { Fragment, PureComponent } from 'react';
import { connect } from "react-redux";
import { removeError } from "../store/actions";

class ErrorMessage extends PureComponent {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.timeout = null;
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.props.removeError();
        },4500);
    }

    handleClose() {
        this.props.removeError();
    }

    componentWillUnmount() {
       clearTimeout(this.timeout);
    }

    render() {
        return <Fragment>
            <div className='errorMessage'>
                <span onClick={this.handleClose} >{this.props.error.message}</span>
            </div>
        </Fragment>
    }

}

export default connect( store =>
    ({error: store.error}),
    { removeError }
)(ErrorMessage);