import { connect } from 'react-redux';
import Buildings from './buildings';
import * as Actions from './../../../store/modules/buildings/actions';

const mapDispatchToProps = {
    getBuildingsList: Actions.getBuildingsList,
    getBuildingQueue: Actions.getBuildingQueue,
    postToBuild: Actions.postBuildingToQueue
};

const mapStateToProps = state => ({
    //resource: code => getResource(state, code),
    buildings: state.buildings.list,
    queue: state.buildings.queue
})

export default connect(mapStateToProps, mapDispatchToProps)(Buildings);
