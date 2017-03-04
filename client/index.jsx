import React from 'react';
import { render } from 'react-dom';
import Routes from './components/Routes';
// import {AppContainer} from './components/app';
// import {Provider} from 'react-redux';
// import configureStore from './configureStore';
// import {setState} from './actions';
import './static/css/style.css';

// const store = configureStore(socket);

// render(<Provider store={store}>
// 	<AppContainer />
// </Provider>, document.getElementById('main'));
render(<Routes />, document.getElementById('main'));