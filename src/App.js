import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import LabValuesInput from './LabValuesInput';
import ABGResults from './ABGResults';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <div className="container container-main">
                    <LabValuesInput
                        labValues={this.state.labValues || {}}
                        onSubmit={(newLabValues) =>{ this.setState({..this.state, labValues: newLabValues}); }}
                        />
                    <ABGResults labValues={this.state || {}}/>
                </div>
      </div>
    );
  }
}

export default App;
