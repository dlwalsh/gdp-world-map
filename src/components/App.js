import React, { Component } from 'react';
import '../../stylesheets/app.scss';
import CountriesTable from './CountriesTable';
import Map from './Map';

class App extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            data: null
        };
    }

    componentWillMount() {

        fetch('./data/countries.json')
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    data: json
                });
            });

    }

    render() {

        const { data } = this.state;

        return data ? (
            <div className="container">
                <div className="map-wrapper">
                    <Map data={data} />
                </div>
                <div className="table-wrapper">
                    <CountriesTable data={data} />
                </div>
            </div>
        ) : (
            <div className="container">Loading</div>
        );

    }

}

export default App;
