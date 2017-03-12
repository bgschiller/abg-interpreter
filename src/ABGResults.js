import React from 'react';
import {labValuesComplete, interpret_abg} from './interpret_lab_values';


const AAGradient = (props) => {
    const {aa_gradient, aa_gradient_uln} = props.results;
    return (
        <div className="result-section row">
            <div className="col-sm-3">
                A-a gradient: {aa_gradient}.
            </div>
            <div className="col-sm-3">
                Upper limit of normal is {aa_gradient_uln}.
            </div>
        </div>
    );
};
const AcidBaseStatus = (props) => {
    const { acid_base_status } = props.results;
    return (
        <div className="result-section row">
            <div className="col-xs-6">
                <p>
                    Acid-base status:
                    {acid_base_status.primary_acid_base_status}
                </p>
            </div>
            <div className="col-xs-6">
                <ul>
                    {acid_base_status.secondary_acid_base_statuses.map((s, ix) => {
                        return <li key={ix}>{s}</li>;
                    })}
                </ul>
            </div>
        </div>);
};
const ChronicityOfRespiratory = (props) => {
    const { value, lower_limit, upper_limit } = props.results.chronicity_of_respiratory;
    const w = 100 * (value - lower_limit) / (upper_limit - lower_limit),
        style = {width:  w + "%"};
    return (<div className="result-section row">
        <p>Chronicity Of Respiratory [alkalosis/acidosis]</p>
        <div className="progress">
            <div className="progress-bar" role="progressbar"
                style={style}
                aria-valuenow={value}
                aria-valuemin={lower_limit}
                aria-valuemax={upper_limit}>
            </div>
        </div>
        <div className="col-xs-2">
            <span>Mostly Chronic</span>
        </div>
        <div className="col-xs-8">
            <span>Mixed</span>
        </div>
        <div className="col-xs-2">
            <span>Mostly Acute</span>
        </div>
    </div>);
};
const Compensation = (props) => {
    const { compensation } = props.results;
    return (<div className="result-section">
        <p>Compensation: {compensation}</p>
    </div>);
};
const AnionGap = (props) => {
    const { anion_gap, anion_gap_normal_reference } = props.results;
    return (<div className="result-section row">
        <div className="col-xs-3">
            Anion Gap: {anion_gap}
        </div>
        <div className="col-xs-3">
            Normal Reference: {anion_gap_normal_reference}
        </div>
    </div>);
};
const CorrectedBicarb = (props) => {
    const { corrected_bicarb } = props.results;
    if (! corrected_bicarb ){
        return null;
    }
    return (<div className="result-section">
        Corrected HCO<sub>3</sub><sup>-</sup>:
        {corrected_bicarb}
    </div>);
};


const ABGResults = (props) => {
    var { labValues } = props.state;
    if (labValues && labValuesComplete(labValues)){
        const results = interpret_abg(labValues);
        return (
            <div className="results">
                <AAGradient results={results} />
                <AcidBaseStatus results={results} />
                <ChronicityOfRespiratory results={results} />
                <Compensation results={results} />
                <AnionGap results={results} />
                <CorrectedBicarb results={results} />
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
