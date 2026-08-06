import './App.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { store } from './redux/store';
import Router from './routes';

const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Router />
            </Provider>
        </BrowserRouter>
    );
};

export default App;
