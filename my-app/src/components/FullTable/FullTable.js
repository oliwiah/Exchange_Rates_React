import React from 'react';
import './FullTable.css';
import moment from 'moment';

const SingleCurrency = (props) => {
    return (
        <tbody>
        <tr className="table-data">
            <td className="table-cell">{props.currency}</td>
            <td className="table-cell">{props.code}</td>
            <td className="table-cell">{props.bid.toFixed(2)}</td>
            <td className="table-cell">{props.ask.toFixed(2)}</td>
        </tr>
        </tbody>
    )
};

const CurrencyList = (props) => {
    return (
        <div>
            <p className="tableTitle">{`NBP currency exchange rates for ${moment().toJSON().slice(0, -14)}`}</p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" rowSpan="2">Currency</th>
                        <th scope="col" rowSpan="2">Code</th>
                        <th scope="col" colSpan="2">Rate</th>
                    </tr>
                    <tr>
                        <th scope="col" className="brd">Buy</th>
                        <th scope="col">Sell</th>
                    </tr>
                </thead>
                {props.ratesTable.map(singleCurrency => <SingleCurrency
                    key={singleCurrency.code + singleCurrency.ask + singleCurrency.bid} {...singleCurrency} />)}
            </table>
            {
                !props.ratesTable.length && <div className="loadingBackground">
                    <div className="loading-pulse"></div>
                </div>
            }
        </div>
    );
};

export default CurrencyList;