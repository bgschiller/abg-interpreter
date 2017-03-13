import React from 'react';
import {labValuesComplete, interpret_abg} from './interpret_lab_values';
import _ from 'underscore';

const AAGradient = (props) => {
    const {aa_gradient, aa_gradient_uln} = props.results;
    return (
        <div className="result-section row">
            <div className="col-sm-3">
                A-a gradient: {Math.round(100*aa_gradient) / 100}
            </div>
            <div className="col-sm-3">
                Upper limit of normal is {aa_gradient_uln}
            </div>
        </div>
    );
};
const AcidBaseStatus = (props) => {
    const { acid_base_status } = props.results;
    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="result-section row">
                    <div className="col-xs-12">
                        <p>
                            <strong>Primary acid-base status: </strong>
                            {acid_base_status.primary_acid_base_status}
                        </p>
                        <strong>Secondary acid-base disturbances:</strong>
                        <ul className="secondary-acid-base-statuses">
                            {acid_base_status.secondary_acid_base_statuses.map((s, ix) => {
                                return <li key={ix}>{s}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>);
};
const ChronicityOfRespiratory = (props) => {
    const { acid_base_status, chronicity_of_respiratory } = props.results;
    // if (!_.contains(['respiratory acidosis', 'respiratory alkalosis'], acid_base_status.primary_acid_base_status)) {
    //     return null;
    // }
    const { value, lower_limit, upper_limit } = chronicity_of_respiratory;
    const w = 57 ||  100 * (value - lower_limit) / (upper_limit - lower_limit),
        style = {width:  w + "%"};
    return (<div className="result-section row chronicity-of-respiration">
        <p>Chronicity Of Respiratory [alkalosis/acidosis]</p>
        <div className="progress">
            <div className="progress-bar" role="progressbar"
                style={style}
                aria-valuenow={value}
                aria-valuemin={lower_limit}
                aria-valuemax={upper_limit}>
            </div>
        </div>
        <div className="col-xs-4 text-left">
            <span>Mostly Chronic</span>
        </div>
        <div className="col-xs-4 text-center">
            <span>Mixed</span>
        </div>
        <div className="col-xs-4 text-right">
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
        Corrected HCO<sub>3</sub><sup>-</sup>&nbsp;:&nbsp;
        {Math.round(corrected_bicarb)}
    </div>);
};


const ABGResults = (props) => {
    var { labValues } = props.state;
    if (labValues && labValuesComplete(labValues)){
        const results = interpret_abg(labValues);
        return (
            <div className="results text-left">
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
