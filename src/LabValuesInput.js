import React from 'react';
import TextField from './TextField';
import _ from 'underscore';

const LabValuesInput = ({labValues={}, onSubmit}) => {
    var textFieldRefs = {},
        setRef = (label) => {
            return (rf) => {
                textFieldRefs[label] = rf;
            }
        };
    return (
    <div className="row">
        <form className="form-inline">
            <TextField label="pH" value={labValues.pH} refFun={setRef("pH")} />
            <TextField label="Na+" value={labValues.Na} refFun={setRef("Na+")} />
            <TextField label="Age" value={labValues.Age} refFun={setRef("Age")} />
            <TextField label="PaCO2" value={labValues.PaCO2} refFun={setRef("PaCO2")} />
            <TextField label="Cl" value={labValues.Cl} refFun={setRef("Cl")} />
            <TextField label="Albumin" value={labValues.Albumin} refFun={setRef("Albumin")} />
            <TextField label="PaO2" value={labValues.PaO2} refFun={setRef("PaO2")} />
            <TextField label="HCO3" value={labValues.HCO3} refFun={setRef("HCO3")} />
            <TextField label="FiO2" value={labValues.FiO2} refFun={setRef("FiO2")} />
            <div className="col-xs-12">
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={() => {
                        onSubmit(_.mapObject(textFieldRefs, 'value'))
                    }
                }
                >Interpret</button>
            </div>
        </form>
    </div>
    )
}

export default LabValuesInput;
