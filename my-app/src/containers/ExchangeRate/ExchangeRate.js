import React from 'react';
import './ExchangeRate.css';
import {
    CurrencyBtn,
    DateBtn,
    SearchBtn
} from '../../components/Buttons/Buttons';
import CurrencyList from '../../components/FullTable/FullTable';
import CustomCurrencyList from '../../components/CustomTable/CustomTable';
import moment from 'moment';
import {
    Route,
    Switch
} from 'react-router-dom';
import { getStartEndDataFetch, getDailyData } from "../../services/FetchServices";

class ExchangeRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ratesTable: [],
            valueStart: moment(),
            valueEnd: moment(),
            chosenCurrency: '',
            ratesTable2: [],
            codeName: '',
            currencyName: '',
        };

        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentDidMount() {
        // fetch(`http://api.nbp.pl/api/exchangerates/tables/c/today/?format=json`)
        //     .then(data => data.json())
        getDailyData()
            .then(data => {
                this.setState({
                    ...this.state,
                    ratesTable: data[0].rates
                })
            })
            .catch(error => console.error('Error:', error))
            /* add some universal code to finally response */
            .finally(response => console.log('finally full table response', response));
    }

    handleChangeCurrency(chosenCurrency2) {
        this.setState({
            ...this.state,
            chosenCurrency: chosenCurrency2,
        })
    }

    handleChangeStart(value) {
        this.setState({
            ...this.state,
            valueStart: value
        });
    }

    handleChangeEnd(value) {
        this.setState({
            ...this.state,
            valueEnd: value
        });
    }

    validateForm() {
        if (this.state.chosenCurrency.toString().length !== 3) {
            alert('Currency MUST be chosen');
            return false;
        }

        if (this.state.valueStart > moment()) {
            alert(`start value MUST NOT be set as a future date`);
            return false
        }

        if (this.state.valueEnd > moment()) {
            alert(`end value MUST NOT be set as a future date`);
            return false
        }

        if (this.state.valueStart.isAfter(this.state.valueEnd)) {
            alert('Start date value MUST be earlier than end date!');
            /* ten false chyba nic nie robi */
            return false;
        }

        /* API allows to get data for max 367 days; the value below is in msec */
        if ((this.state.valueStart.toString() - this.state.valueEnd.toString()) > 31708800000) {
            alert('You may ask for maximum 93 days table rate');
            return false;
        }

        return true;
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        let startDataSec = this.state.valueStart.toJSON().slice(0, -14);
        let endDataSec = this.state.valueEnd.toJSON().slice(0, -14);

        // alert(`Given data has been submitted: ${this.state.chosenCurrency} ${this.state.valueStart.toString().length} ${this.state.valueEnd}`);
        event.preventDefault();
        // fetch(`http://api.nbp.pl/api/exchangerates/rates/c/${this.state.chosenCurrency}/${startDataSec}/${endDataSec}/?format=json`)
        //     .then(data => data.json())
        getStartEndDataFetch(this.state.chosenCurrency, startDataSec, endDataSec)
            .then(data => {
                this.setState({
                    ...this.state,
                    ratesTable2: data.rates,
                    codeName: data.code,
                    currencyName: data.currency,
                });
            })
            .catch(error => console.error('Error:', error))
            /* add some universal code to finally response */
            .finally(response => console.log('finally custom table response', response));
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render={() =>
                    <div className="container">
                        <CurrencyList ratesTable={this.state.ratesTable} />
                    </div>
                } />
                <Route path="/search" render={() =>
                    <div>
                        <form className="buttons" onSubmit={this.handleSubmit}>
                            <CurrencyBtn
                                ratesTable={this.state.ratesTable}
                                chosenCurrency={this.state.chosenCurrency}
                                onChange={this.handleChangeCurrency}
                            />
                            <DateBtn
                                name={"Start date:"}
                                value={this.state.valueStart}
                                onChange={this.handleChangeStart}
                            />
                            <DateBtn
                                name={"End date:"}
                                value={this.state.valueEnd}
                                onChange={this.handleChangeEnd}
                            />
                            <SearchBtn
                                onSubmit={this.handleSubmit}
                            />
                        </form>
                        <div className="container">
                            <CustomCurrencyList
                                startDate={this.state.valueStart}
                                endDate={this.state.valueEnd}
                                chosenCurrency={this.state.chosenCurrency}
                                ratesTable2={this.state.ratesTable2}
                                codeName={this.state.codeName}
                                currencyName={this.state.currencyName}
                                valueStart={this.state.valueStart}
                                valueEnd={this.state.valueEnd}
                            />
                        </div>
                    </div>
                } />
            </Switch>
        );
    }
}

export default ExchangeRate;