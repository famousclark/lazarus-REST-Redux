import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {store, sagaMiddleware} from './store';
import registerServiceWorker from './registerServiceWorker';

import rootSaga from './middleware/saga';

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
        <div>
           <App />
        </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
