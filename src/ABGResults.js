import React from 'react';
import {labValuesComplete, interpret_abg} from './interpret_lab_values';


const AAGradient = (props) => {
    return <p>AAGradient</p>;
};
const AcidBaseStatus = (props) => {
    return <p>AcidBaseStatus</p>;
};
const ChronicityOfRespiratory = (props) => {
    return <p>ChronicityOfRespiratory</p>;
};
const Compensation = (props) => {
    return <p>Compensation</p>;
};
const AnionGap = (props) => {
    return <p>AnionGap</p>;
};
const CorrectedBicarb = (props) => {
    return <p>CorrectedBicarb</p>;
};


const ABGResults = (props) => {
    var { labValues } = props.state;
    if (labValues && labValuesComplete(labValues)){
        const interpetation = interpret_abg(labValues);
        return (
            <div className="results">
                <AAGradient interpetation={interpetation} />
                <AcidBaseStatus interpetation={interpetation} />
                <ChronicityOfRespiratory interpetation={interpetation} />
                <Compensation interpetation={interpetation} />
                <AnionGap interpetation={interpetation} />
                <CorrectedBicarb interpetation={interpetation} />
            </div>
        );
    }
    return (
        <div className="results">
            <p>results will live here</p>
        </div>
    );
};

export default ABGResults;
