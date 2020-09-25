import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import * as styles from './styles.css';
import Header from "./header";
import Buildings from "./../../buildings"
import Quests from "../../quests";

const Layout = ({getColonyStatus}) => {

    useEffect(() => {
        console.log('Mounted App');
        getColonyStatus();
    }, []);

    return (
        <div className={'gameBody'}>
            <div className={'header'}>
                <Header/>
            </div>
            <div className={'body'}>
                <Router>
                    <div className={'navBar'}>
                        <nav>
                            <ul>
                                <li><Link to={'/'} >Overview</Link></li>
                                <li><Link to={'/buildings'}>Buildings</Link></li>
                                <li><Link to={'/researches'}>Researches</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className={'mainGameBody'}>
                        <div className={'page'}>
                            <Switch>
                                <Route path="/buildings">
                                    <Buildings />
                                </Route>
                                <Route path="/researches">
                                    <p>Researches</p>
                                </Route>
                                <Route path="/">
                                    <p>Main</p>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                    <Quests/>
                </Router>
            </div>
        </div>
    );
};

export default Layout;
