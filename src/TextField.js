import React, { Component } from 'react';

class TextField extends Component {
    render(){
        return (
            <div className="form-group col-xs-4">
                <div className="row">
                    <label className="col-xs-4">{this.props.label}&nbsp;</label>
                    <input
                        className="form-control col-xs-8"
                        type="text"
                        defaultValue={this.props.value}
                        ref={function(input){ this.props.refFun(input);}.bind(this)}
                    />
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
