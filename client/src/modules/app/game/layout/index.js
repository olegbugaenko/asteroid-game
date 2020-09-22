import { connect } from 'react-redux';
import { getColonyStatus } from './../../../../store/modules/colony/actions';
import Layout from './layout';

const mapDispatchToProps = {
    getColonyStatus,
};

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
