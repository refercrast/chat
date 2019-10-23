import React, { Fragment } from "react";

interface StateProps {
    iconClass: string
    tittle: string
}

const SocialButton = (props: StateProps) => {
  return (
      <Fragment>
          <div>
              <i className={`fab ${props.iconClass}`}/>
          </div>
          <div className='social-button-text'>
              <p>{props.tittle}</p>
          </div>
      </Fragment>
  )
};

export default SocialButton;