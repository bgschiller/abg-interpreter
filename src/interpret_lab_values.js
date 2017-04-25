import _ from 'underscore';

export function interpret_abg(labValues){

    /* establish variables for use as example structure */
    var aa_gradient = 12,
        aa_gradient_uln = 18,
        primary_acid_base_status = 'metabolic acidosis',
        secondary_acid_base_statuses = ['respiratory alkalosis', 'anion gap metabolic acidosis'],
        anion_gap = 12,
        anion_gap_normal_reference = 11,
        compensation = 'an embarrasingly large truck',
        corrected_bicarb = {
            value: 26,
            indicates: 'but what does it mean??'
        },
        comp; // or corrected_bicarb = null



    var { pH, PaCO2, PaO2, Na, Cl, HCO3, Age, Albumin, FiO2 } = labValues;

    /* Morgan fills this in */
    if (pH < 7.4 && PaCO2 < 40){
        primary_acid_base_status = 'metabolic acidosis';
    } else if (pH >7.4 && PaCO2>40){
        primary_acid_base_status = 'respiratory acidosis';
    }else if (pH>7.4 && PaCO2<40){
        primary_acid_base_status = 'respiratory alkalosis'
    }else if (pH>7.4 && PaCO2>40){
        primary_acid_base_status = 'metabolic alkalosis'
    }
    aa_gradient = (FiO2*7.13)-PaO2-(PaCO2/0.8);
    aa_gradient_uln = ((4+Age)/4);
    anion_gap = (Na-Cl-HCO3);
    var anion_gap_ref = (Albumin*3);
    var resp_chronicity = Math.abs((10*(7.4-pH))/(PaCO2-40));

    if (anion_gap > anion_gap_ref){
        corrected_bicarb = (HCO3+(anion_gap-anion_gap_ref));
    } else {
        corrected_bicarb = null;
    }

    if (primary_acid_base_status === 'metabolic acidosis'){
        comp = (40-PaCO2)/(24-HCO3)
        if (1<comp && comp<1.5) {
            compensation = 'compensated'
        }
        if (1>comp || comp>1.5) {
            compensation = 'not compensated'
        }
    }
    if (primary_acid_base_status === 'metabolic alkalosis'){
        comp = (PaCO2-40)/(HCO3-24)
        if (0.25<comp && comp<1) {
            compensation = 'compensated'
        }
        if (0.25>comp || comp>1) {
            compensation = 'not compensated'
        }
    }
    if ((primary_acid_base_status === 'respiratory_acidosis') && (resp_chronicity>0.055)){
        comp = ((HCO3-24)/(PaCO2-40))
        if (comp>=0.1){
            compensation = 'compensated'
        }
        if (comp<0.1){
            compensation = 'not compensated'
        }
    }
    if ((primary_acid_base_status === 'respiratory alkalosis') && (resp_chronicity>0.055)){
        comp = ((24-HCO3)/(40-PaCO2))
        if (comp>=0.1){
            compensation = 'compensated'
        }
        if (comp<0.1){
            compensation = 'not compensated'
        }
    }
    if (primary_acid_base_status === 'respiratory acidosis' && resp_chronicity<=0.055){
        comp = ((HCO3-24)/(PaCO2-40))
        if (comp>=0.4){
            compensation = 'compensated'
        }
        if (comp<0.4){
            compensation = 'not compensated'
        }
    }
    if (primary_acid_base_status === 'respiratory alkalosis' && resp_chronicity<=0.055){
        comp = ((24-HCO3)/(40-PaCO2))
        if (comp>0.2 && comp<0.5){
            compensation = 'compensated'
        }
        if (comp<0.2 || comp>0.5){
            compensation = 'not compensated'
        }
    }

    /* all the way to here */
    return {
        labValues,
        aa_gradient,
        aa_gradient_uln,
        acid_base_status: {
            primary_acid_base_status,
            secondary_acid_base_statuses,
        },
        anion_gap,
        anion_gap_normal_reference,
        chronicity_of_respiratory: {
            value: resp_chronicity,
            lower_limit: .03,
            upper_limit: .08,
        },
        compensation,
        corrected_bicarb,
    };
}

function validatePH(val){
    if (val >= 0 && val <= 14){
        return null;
    }
    return 'pH must be between 0 and 14';
}

function validateNa(val){
    if (val >= 110 && val <= 170){
        return null;
    }
    return 'Na+ must be between 110 and 170';
}

function validateAge(val){
    if (val >= 0 && val <= 120){
        return null;
    }
    return 'Age must be between 0 and 120';
}

function validateCl(val){
    if (val >= 70 && val <= 130){
        return null;
    }
    return 'Cl- should be between 70 and 130';
}

function validateFiO2(val){
    if (val >= 2 && val <= 100){
        return null;
    }
    return 'FiO2 should be between 2 and 100 (eg, 28% rather than 0.28)';
}

export const labValuesDefns = [
    {name: 'pH', label: 'pH', validate: validatePH},
    {name: 'Na', label: "Na+", validate: validateNa},
    {name: 'Age', label: "Age", units:'years', validateAge},
    {name: 'PaCO2', label: "PaCO2"},
    {name: 'Cl', label: "Cl-", validate: validateCl},
    {name: 'Albumin', label: "Albumin"},
    {name: 'PaO2', label: "PaO2"},
    {name: 'HCO3', label: "HCO3"},
    {name: 'FiO2', label: "FiO2", units:'%', validate: validateFiO2},
];


export function labValuesComplete(labValues){
    return _.all(
        labValuesDefns
        .map(({name}) => !!labValues[name])
    );
}

export function labValuesValid(labValues){
    return !_.any(
        labValuesDefns
        .map(({name, validate}) => validate && validate(labValues[name]))
    );
}
