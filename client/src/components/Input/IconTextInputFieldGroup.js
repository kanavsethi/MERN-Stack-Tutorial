import React from 'react'
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function IconTextInputFieldGroup(props) {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <FontAwesomeIcon icon={props.icon} />
                </span>
            </div>
            <input
                type={props.type}
                className={classnames("form-control form-control-lg", { 'is-invalid': props.error })}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
            />
            {props.info && (<small className="form-text text-muted">{props.info}</small>)}
            {props.error && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    );
}
