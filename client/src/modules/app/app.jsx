import React, {useEffect} from 'react';
import MainPage from './mainpage';
import Layout from './game/layout';

const App = ({checkAuth, isAuthorized}) => {

    useEffect(() => {
        checkAuth();
        console.log('Mounted App');
    }, []);

    if(!isAuthorized) {
        return (<MainPage />);
    }

    return (
        <Layout />
    );
};

export default App;
