import React from 'react';
import { render } from 'react-dom';
import app from './app';

render(app, document.getElementById('app'));
if (module.hot) {
    module.hot.accept();
}