import React, { Component } from 'react';

class TextField extends Component {
    render(){
        const { units, label, value, onChange, validate } = this.props;
        var error = validate && validate(value);
        return (
            <div className="form-group">
                 <label className="sr-only" htmlFor={label}>{label}</label>
                    <div className="input-group input-group-lg">
                        <div className="left-label input-group-addon">{label}</div>
                        <input
                            className="form-control"
                            name={label}
                            type="text"
                            defaultValue={value}
                            onChange={onChange}
                        />
                            <div className="input-group-addon">
                               {units}
                           </div>
                    </div>
                    <div className="error">
                        {error}
                    </div>
            </div>)
    }
}

export { TextField };

class TextDisplay extends Component {
    render(){
        return (
            <div className="col-xs-4 text-left">
                <div className="quantity">
                    <strong>{this.props.label}&nbsp;</strong>
                    <span className="badge">{ this.props.value }</span>
                </div>
            </div>
        );
    }
}

export { TextDisplay };
