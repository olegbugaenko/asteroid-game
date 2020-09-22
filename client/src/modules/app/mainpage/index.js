import { connect } from 'react-redux';
import { authorize, signup } from './../../../store/modules/user/actions';
import MainPage from './main';

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        authorize: (payload) => dispatch(authorize(payload)),
        signup: (payload) => dispatch(signup(payload)),
    }
}

export default connect(null, mapDispatchToProps)(MainPage);
