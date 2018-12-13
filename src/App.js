import React, { Component } from 'react';
import animatecss from 'animate.css';
import { Dashboard, Widget } from 'react-realtime-dashboard';
import './App.css';
import InfosSports from "./Widget/InfosSports";

class App extends Component {
    render() {
        return (
            <Dashboard row={4} col={4} gutter={10} animationClassIn='animated flipInX' animationClassOut='animated flipOutX'>
                <Widget>
                    <InfosSports/>
                </Widget>
            </Dashboard>
        );
    }
}

export default App;