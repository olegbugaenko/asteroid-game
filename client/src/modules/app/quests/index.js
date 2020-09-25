import { connect } from 'react-redux';
import Quests from './quests';
import * as Actions from './../../../store/modules/quests/actions';

const mapDispatchToProps = {
    updateHiddenStatus: Actions.setHiddenStatus,
    claimReward: Actions.claimReward,
    /*getBuildingsList: Actions.getBuildingsList,
    getBuildingQueue: Actions.getBuildingQueue,
    postToBuild: Actions.postBuildingToQueue*/
};

const mapStateToProps = state => ({
    //resource: code => getResource(state, code),
    quests: state.quests.list,
    currentQuest: state.quests.list[state.quests.currentId],
})

export default connect(mapStateToProps, mapDispatchToProps)(Quests);
