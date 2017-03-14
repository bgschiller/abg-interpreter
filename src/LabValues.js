import React from 'react';
import { TextField, TextDisplay } from './TextField';
import _ from 'underscore';

const LabValuesInput = ({labValues, onSubmit}) => {
    var textFieldRefs = {},
        setRef = (label) => {
            return (rf) => {
                textFieldRefs[label] = rf;
            }
        };
    return (
    <div>
        <div className="quantity-inputs">
            <TextField label="pH" value={labValues.pH} refFun={setRef("pH")} />
            <TextField label="Na+" value={labValues.Na} refFun={setRef("Na")} />
            <TextField label="Age" value={labValues.Age} refFun={setRef("Age")} />
            <TextField label="PaCO2" value={labValues.PaCO2} refFun={setRef("PaCO2")} />
            <TextField label="Cl-" value={labValues.Cl} refFun={setRef("Cl")} />
            <TextField label="Albumin" value={labValues.Albumin} refFun={setRef("Albumin")} />
            <TextField label="PaO2" value={labValues.PaO2} refFun={setRef("PaO2")} />
            <TextField label="HCO3" value={labValues.HCO3} refFun={setRef("HCO3")} />
            <TextField label="FiO2" value={labValues.FiO2} refFun={setRef("FiO2")} addOn="%" />
            <div className="row">
                <div className="col-xs-12">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={(e) => {
                            onSubmit(_.mapObject(textFieldRefs, 'value'))
                            e.preventDefault();
                        }
                    }
                    >Interpret</button>
                </div>
            </div>
        </div>
    </div>);
};

export { LabValuesInput };


const LabValuesDisplay = ({labValues, onEditClick}) => {
    return (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="row">
                    <TextDisplay label="pH" value={labValues.pH} />
                    <TextDisplay label="Na+" value={labValues.Na} />
                    <TextDisplay label="Age" value={labValues.Age} />
                    <TextDisplay label="PaCO2" value={labValues.PaCO2} />
                    <TextDisplay label="Cl" value={labValues.Cl} />
                    <TextDisplay label="Albumin" value={labValues.Albumin} />
                    <TextDisplay label="PaO2" value={labValues.PaO2} />
                    <TextDisplay label="HCO3" value={labValues.HCO3} />
                    <TextDisplay label="FiO2" value={labValues.FiO2} />
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
