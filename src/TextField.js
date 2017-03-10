import React, { Component } from 'react';

class TextField extends Component {
    render(){
        return (
            <div className="form-group col-xs-6 col-sm-4">
                <div className="row">
                    <div className="col-xs-4">
                        <label>{this.props.label}&nbsp;</label>
                    </div>
                    <div className="col-xs-8">
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={this.props.value}
                            ref={function(input){ this.props.refFun(input);}.bind(this)}
                        />
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
