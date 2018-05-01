import React from 'react';
import './CustomTable.css';

const ChosenCurrency = (props) => {
    return (
        <tr className="table-data">
            <td className="table-cell">{props.currencyName}</td>
            <td className="table-cell">{props.codeName}</td>
            <td className="table-cell">{props.bid.toFixed(2)}</td>
            <td className="table-cell">{props.ask.toFixed(2)}</td>
            <td className="table-cell">{props.effectiveDate}</td>
        </tr>
    );
};

const CustomCurrencyList = (props) => {
    return (
        <div>
            <p className="tableTitle">{`Exchange rates of ${props.codeName} from ${props.valueStart.toJSON().slice(0, -14)} to ${props.valueEnd.toJSON().slice(0, -14)}`}</p>
            <table>
                <tbody>
                    <tr>
                        <th scope="col" rowSpan="2">Currency</th>
                        <th scope="col" rowSpan="2">Code</th>
                        <th scope="col" colSpan="2">Rate</th>
                        <th scope="col" rowSpan="2" className="dateCell">Date</th>
                    </tr>
                    <tr>
                        <th scope="col" className="brd">Buy</th>
                        <th scope="col">Sell</th>
                    </tr>
                    {props.ratesTable2.map(selectedCurrency => <ChosenCurrency key={selectedCurrency.no + selectedCurrency.bid + selectedCurrency.ask}
                        {...selectedCurrency}
                        currencyName={props.currencyName}
                        codeName={props.codeName}
                    />)}


                </tbody>
            </table>
            {
                !props.ratesTable2.length && <div className="loadingBackground">
                    <div className="loading-pulse"></div>
                </div>
            }
        </div>
    );
};

export default CustomCurrencyList;