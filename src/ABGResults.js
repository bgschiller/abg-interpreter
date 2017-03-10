import React from 'react';
import {labValuesComplete} from './interpret_lab_values';

const ABGResults = (props) => {
    if (!labValuesComplete(props.labValues)){
        return <div className="results"></div>;
    }
    return (
        <div className="results">
            <p>results will live here</p>
        </div>
    );
};

export default ABGResults;
