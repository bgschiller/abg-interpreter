import React from 'react';
import {labValuesComplete, interpret_abg} from './interpret_lab_values';
import _ from 'underscore';

const AAGradient = (props) => {
    const {aa_gradient, aa_gradient_uln} = props.results;
    return (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="result-section row">
                <div className="col-xs-6">
                    <strong>A-a gradient: </strong>{Math.round(100*aa_gradient) / 100}
                </div>
                <div className="col-xs-6 text-right">
                    Upper limit of normal is {aa_gradient_uln}
                </div>
            </div>
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
                        <Compensation results={props.results} />
                    </div>
                </div>
            </div>
        </div>);
};
const ChronicityOfRespiratory = (props) => {
    const { acid_base_status, chronicity_of_respiratory } = props.results;
    if (!_.contains(['respiratory acidosis', 'respiratory alkalosis'], acid_base_status.primary_acid_base_status)) {
        return null;
    }
    const { value, lower_limit, upper_limit } = chronicity_of_respiratory;
    const w = 57 ||  100 * (value - lower_limit) / (upper_limit - lower_limit),
        style = {width:  w + "%"};
    return (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="result-section row chronicity-of-respiration">
                <p><strong>Chronicity of {acid_base_status.primary_acid_base_status}</strong></p>
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
            </div>
        </div>
    </div>);
};
const Compensation = (props) => {
    const { compensation } = props.results;
    return <p><strong>Compensation: </strong>{compensation}</p>;
};
const AnionGap = (props) => {
    const { anion_gap, anion_gap_normal_reference } = props.results;
    return (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="result-section row">
                <div className="col-xs-6">
                    <strong>Anion Gap: </strong>{anion_gap}
                </div>
                <div className="col-xs-6 text-right">
                    Normal Reference: {anion_gap_normal_reference}
                </div>
            </div>
        </div>
    </div>);
};
const CorrectedBicarb = (props) => {
    const { corrected_bicarb } = props.results;
    if (! corrected_bicarb ){
        return null;
    }
    return (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="result-section">
                <strong>Corrected HCO<sub>3</sub><sup>-</sup> : </strong>
                {Math.round(corrected_bicarb)}
            </div>
        </div>
    </div>
    );
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
                <AnionGap results={results} />
                <CorrectedBicarb results={results} />
            </div>
        );
    }
    return (
        <div className="results">
            <p>One or more </p>
        </div>
    );
};

export default ABGResults;
