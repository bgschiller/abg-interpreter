import React, { Component } from 'react';

class TextField extends Component {
    render(){
        const { addOn, label, value, refFun } = this.props;
        return (
            <div className="form-group">
                 <label className="sr-only" for={label}>{label}</label>
                    <div className="input-group">
                        <div className="left-label input-group-addon">{label}</div>
                        <input
                            className="form-control input-sm"
                            name={label}
                            type="text"
                            defaultValue={value}
                            ref={function(input){ refFun(input);}}
                        />
                            <div className="input-group-addon">
                               {addOn}
                           </div>
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
