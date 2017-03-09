import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import LabValuesInput from './LabValuesInput';


class App extends Component {
    render() {
        return (
            <div className="App">
                <NavBar/>
                <div className="container container-main">
                    <LabValuesInput
                        labValues={this.state || {}}
                        onSubmit={(newLabValues) =>{ debugger; this.setState(newLabValues); }}
                        />

                </div>
      </div>
    );
  }
}

export default App;
