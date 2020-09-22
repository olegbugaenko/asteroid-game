import React, {useState} from 'react';
import classNames from 'classnames';
import * as styles from './styles.css';
import SignIn from './../auth/sign-in';

const MainPage = ({authorize, signup}) => {

    const [activeTab, switchTab] = useState(1);

    return (<div className={'main'}>
        <div className={'header'}>
            <h1>Welcome to ?????</h1>
        </div>
        <div className={'columns'}>
            <div className={classNames('left', 'column')}>
                <div className={'paper'}>
                    <p>News</p>
                </div>
            </div>
            <div className={classNames('center', 'column')}>
                <div className={'paper'}>
                    <div className={'tabs'}>
                        <div className={classNames({
                            'tab-label': 1,
                            'active': activeTab === 1
                        })} onClick={() => {switchTab(1)}}>
                            <span>Sign In</span>
                        </div>
                        <div className={classNames({
                            'tab-label': 1,
                            'active': activeTab === 2
                        })} onClick={() => {switchTab(2)}}>
                            <span>Sign Up</span>
                        </div>
                    </div>
                    <div className={'tabsContent'}>
                        {activeTab === 1 && (<SignIn authorize={authorize}/>)}
                        {activeTab === 2 && (<SignUp signup={signup}/>)}
                    </div>
                </div>

            </div>
            <div className={classNames('right', 'column')}>
                <div className={'paper'}>
                    <p>About</p>
                </div>
            </div>
        </div>

    </div>)

}

export default MainPage;
