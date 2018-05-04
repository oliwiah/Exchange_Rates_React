# Exchange Rates Application with React

This project is an application showing current exchange rates table from [National Polish Bank](http://api.nbp.pl/en.html) and allowing to search for an exchange rates of a certain currency between choosen dates.

The project has been bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

After creating the project in **React**, I decided to rebuild it into **Redux** (which you can find [here](http://exchange-rates-redux.surge.sh/) which allowed me to reuse previously created components as well as catch the difference between those two libraries.

## Technologies used

* ReactJS with React Router and Reactstrap (only for buttons)
* CSS
* Ajax / Fetch API

## Functionality

With [this app](http://exchange-rates-react.surge.sh/) you can check current ratestable as well as search for rates of a certain currency between chosen dates (up to 367 days long).

## Used methods

* React Routing to clear the view for the user,
* Async rendering to load only data that changes its state,
* Loader sign to inform the user that the API request is fetching,
* Form validation not to allow the user to send incomprehensible requests to the API server.

[PREVIEW MY APP](http://exchange-rates-react.surge.sh/)
