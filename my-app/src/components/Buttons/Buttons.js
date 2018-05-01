import React from 'react';
import './Buttons.css';
import { Button } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/* no props given through constructor though there are this.props.ratesTable used. Not sure whether to use class or const here (const didn't work when I tried) */
class CurrencyBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenCurrency: props.chosenCurrency,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.persist();
        this.props.onChange(e.target.value);

        this.setState({
            chosenCurrency: e.target.value
        });
    }


    render() {
        return (
            <div className="btn">
                <p>Currency</p>
                <select onChange={this.handleChange} value={this.state.chosenCurrency}>
                    <option value="" disabled defaultValue hidden>Select</option>
                    {this.props.ratesTable.map(singleCurrency => <option key={singleCurrency.code + singleCurrency.ask + singleCurrency.bid} 
                        value={singleCurrency.code}> 
                            {singleCurrency.code} 
                        </option>)}
                </select>
            </div>
        )
    }
}

class DateBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.value
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.props.onChange(date);

        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div className="btn">
                <p>{this.props.name}</p>
                <DatePicker
                    dateFormat="YYYY-MM-DD"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

const SearchBtn = (props) => {

    return (
        <div className="btn">
            <Button
                type="submit"
                color="secondary"
                onSubmit={props.onSubmit}
            >
                Search
                </Button>
        </div>
    );
};

export {
    CurrencyBtn,
    DateBtn,
    SearchBtn
}