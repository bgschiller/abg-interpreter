import React, { Component } from 'react';
import { TextField, TextDisplay } from './TextField';
import _ from 'underscore';
import { labValuesDefns } from './interpret_lab_values';

class LabValuesInput extends Component {
    constructor(props){
        super(props);
        this.state = props.labValues;
    }
    render() {
        var { onSubmit } = this.props,
            setStateComponent = (key) => (evt) => {
                this.setState({...this.state, [key]: evt.target.value});
            };
        return (
        <div>
            <div className="quantity-inputs">
                {labValuesDefns.map(({label, name, validate, units}) => {
                    return <TextField
                        key={name}
                        label={label}
                        value={this.state[name]}
                        validate={validate}
                        units={units}
                        onChange={setStateComponent(name)}
                    />
                })}
                <div className="row">
                    <div className="col-xs-12">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={(e) => {
                                onSubmit(this.state);
                                e.preventDefault();
                            }
                        }
                        >Interpret</button>
                    </div>
                </div>
            </div>
        </div>);
    }
};

export { LabValuesInput };


const LabValuesDisplay = ({labValues, onEditClick}) => {
    return (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="row">
                {labValuesDefns.map(({label, name, validate, units}) => {
                    return <TextDisplay
                        key={name}
                        label={label}
                        value={labValues[name]}
                        units={units}
                    />
                })}
            </div>
            <div className="row edit-button">
                <div className="col-xs-12">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={function(e) {
                            e.preventDefault();
                            onEditClick();
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export { LabValuesDisplay };
