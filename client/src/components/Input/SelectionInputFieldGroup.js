import React from 'react'
import classnames from 'classnames';

export default function SelectionInputFieldGroup(props) {

    let selectionOptions = props.options.map(option => (
        <option key={option.label} value={option.value}>{option.label}</option >
    ));
    return (
        <div className="form-group">
            <select
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                className={classnames("form-control form-control-lg", { 'is-invalid': props.error })}
                required={props.required}>
                {selectionOptions}
            </select>
            {props.info && (<small className="form-text text-muted">{props.info}</small>)}
            {props.error && (<div className="invalid-feedback">{props.error}</div>)}
        </div>
    );
}
