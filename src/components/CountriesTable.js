import React from 'react';
import '../../stylesheets/table.scss';

const CountriesTable = ({ data }) => (
    <table className="table-standard">
        <thead>
            <th>Country</th>
            <th className="text-right">GDP<br /><small>($US mil)</small></th>
        </thead>
        <tbody>
            {data.map(({ name, gdp, code }) => (
                <tr key={code}>
                    <td>{name}</td>
                    <td className="text-right">{gdp}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default CountriesTable;
