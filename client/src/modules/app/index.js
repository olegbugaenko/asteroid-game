import { connect } from 'react-redux';
import { checkAuth } from './../../store/modules/user/actions';
import App from './app.jsx';

const mapDispatchToProps = {
    checkAuth,
};

const mapStateToProps = state => ({
    isAuthorized: state.user.isAuthorized,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
