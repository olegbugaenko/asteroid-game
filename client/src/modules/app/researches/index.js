import { connect } from 'react-redux';
import Researches from './researches';
import * as Actions from './../../../store/modules/researches/actions';

const mapDispatchToProps = {
    getResearchesList: Actions.getResearchesList,
    getResearchQueue: Actions.getResearchQueue,
    postToResearch: Actions.postResearchToQueue
};

const mapStateToProps = state => ({
    //resource: code => getResource(state, code),
    researches: state.researches.list,
    queue: state.researches.queue
})

export default connect(mapStateToProps, mapDispatchToProps)(Researches);
