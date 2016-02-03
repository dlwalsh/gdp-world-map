import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../stylesheets/map.scss';

class Map extends Component {

    componentDidMount() {

        const map = L.map(findDOMNode(this));
        const { data } = this.props;

        map.setView([0, 0], 3);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        L.Icon.Default.imagePath = 'leaflet'; // leaflet images path

        data.forEach(({ name, gdp, lat, lng }) => {
            if (lat !== undefined && lng !== undefined) {
                L.marker([ lat, lng ])
                    .addTo(map)
                    .bindPopup('<span style="font-weight:bold">' + name + '</span><br>GDP: $' + gdp);
            }
        });

    }

    render() {
        return (
            <div className="map" />
        );
    }

}

export default Map;
