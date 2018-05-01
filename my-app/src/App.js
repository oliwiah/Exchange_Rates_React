import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ExchangeRate from './containers/ExchangeRate/ExchangeRate';
import {
    BrowserRouter
} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header />
                        <ExchangeRate />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
