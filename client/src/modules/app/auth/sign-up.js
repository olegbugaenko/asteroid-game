import React, {useState} from 'react';
import classNames from 'classnames';
import * as styles from './styles.css';
import {connect} from 'react-redux';

const SignUp = ({signup, error}) => {

    const [email, setEmail] = useState('');

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [password, setPassword] = useState('');


    const attemptAuth = () => {
        console.log({email, password});
        signup({email, password, firstName, lastName});
    }


    return (<div className={'form'}>
        <div className={'form-row'}>
            <label>Email*</label>
            <input type={"text"} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={'form-row'}>
            <label>Password*</label>
            <input type={"password"} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={'form-row'}>
            <label>First Name</label>
            <input type={"text"} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className={'form-row'}>
            <label>Last Name</label>
            <input type={"text"} onChange={e => setLastName(e.target.value)} />
        </div>
        {error && (<div className={'error'}>{error}</div> )}
        <div className={'form-button'}>
            <button className={'success-btn'} onClick={() => {attemptAuth()}}>Sign In</button>
        </div>
    </div>)

}

const mapStateToProps = state => ({
    error: state.user && state.user.ui.signup.error,
})

export default connect(mapStateToProps)(SignUp);
