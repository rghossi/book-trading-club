import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
// import {AppContainer} from './components/app';
// import {Provider} from 'react-redux';
// import configureStore from './configureStore';
// import {setState} from './actions';
import './static/css/style.css';

// const store = configureStore(socket);

// render(<Provider store={store}>
// 	<AppContainer />
// </Provider>, document.getElementById('main'));
render(<App />, document.getElementById('main'));