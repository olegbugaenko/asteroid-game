import { connect } from 'react-redux';
import { getResources } from './../../../../../store/modules/colony/selector';
import Header from './header';

const mapDispatchToProps = {
    // getColonyStatus,
};

const mapStateToProps = state => ({
    //resource: code => getResource(state, code),
    resources: getResources(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
