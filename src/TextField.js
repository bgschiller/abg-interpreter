import React, { Component } from 'react';

class TextField extends Component {
    render(){
        const { addOn, label, value, refFun } = this.props;
        return (
            <div className="form-group col-xs-6 col-sm-4">
                <div className="row">
                    <div className="col-xs-4">
                        <label>{label}&nbsp;</label>
                    </div>
                    <div className="col-xs-8 input-group">
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={value}
                            ref={function(input){ refFun(input);}.bind(this)}
                        />
                        { addOn ? (
                            <span className="input-group-addon">
                               {addOn}
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>)
    }
}

export { TextField };

class TextDisplay extends Component {
    render(){
        return (
            <div className="col-xs-4">
                <strong>{this.props.label}&nbsp;</strong>
                { this.props.value }
            </div>
        );
    }
}

export { TextDisplay };
