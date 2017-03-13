import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import {LabValuesInput, LabValuesDisplay} from './LabValues';
import ABGResults from './ABGResults';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labValues: {
                pH: 7.2,
                Age: 27,
                Cl: 95,
                Na: 145,
                PaCO2: 38,
                Albumin: 4.5,
                PaO2: 96,
                HCO3: 26,
                FiO2: 21,
            },
            mode: 'editing',
        };
    }
    render() {
        var labValuesElem,
            setNewLabValues = (newLabValues) =>{
                var newState = Object.assign({}, this.state, {
                    labValues: newLabValues,
                    mode: 'reviewing',
                });
                this.setState(newState);
            };

        if (this.state.mode === 'editing'){
            labValuesElem = (
                <LabValuesInput
                    labValues={this.state.labValues}
                    onSubmit={setNewLabValues}
                />);
        } else {
            labValuesElem = (
                <LabValuesDisplay
                    labValues={this.state.labValues}
                    onEditClick={() => {
                        var newState = Object.assign({}, this.state, {
                            mode: 'editing',
                        });
                        this.setState(newState);
                    }}
                />);
        }

        return (
            <div className="App">
                <NavBar/>
                <div className="container container-main">
                    {labValuesElem}
                    <ABGResults state={this.state || {}}/>
                </div>
            </div>
    );
  }
}

export default App;
