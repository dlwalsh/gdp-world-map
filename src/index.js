import React from 'react';
import { render } from 'react-dom';
import '../stylesheets/reset.scss';
import App from './components/App';

const mount = document.querySelector('#mount');

render(<App />, mount);
