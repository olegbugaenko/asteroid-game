import React from 'react';
import classNames from 'classnames';
import * as styles from './styles.css';
import Modal from './../../../shared/components/modal';
import SvgLoader from './../../../shared/components/svg';

const Quests = ({quests, currentQuest, updateHiddenStatus, claimReward}) => {
    if(!currentQuest) return (<div></div>);

    return (<React.Fragment>
        <div className={'quests-snippet'}>
            <div className={classNames('paper', 'quests')} onClick={() => updateHiddenStatus(false)}>
                {currentQuest.title}
            </div>
        </div>
        <Modal
            isOpened={!currentQuest.isHidden}
            title={currentQuest.title}
            buttons={[...(
                currentQuest.status > 1 ? [(<button className={classNames('button-claim', 'success-btn')} onClick={() => claimReward()}>Claim</button>)] : []
            ), (<button className={classNames('button-close', 'fail-btn')} onClick={() => updateHiddenStatus(true)}>Close</button>)]}
        >
            <div dangerouslySetInnerHTML={{__html: currentQuest.description}}/>
            <div className={'columns'}>
                <div className={classNames('requirements', 'column')}>
                    <p className={'sub-title'}>{'Requirements'}</p>
                    {currentQuest.requirements.map(req => (<p>{req.name} ({req.level})</p>))}
                </div>
                <div className={classNames('rewards', 'column')}>
                    <p className={'sub-title'}>{'Rewards'}</p>
                    {currentQuest.reward.map(rew => (<p className={'resourceCost'}>
                        <SvgLoader scope={'resources'} icon={rew.resourceCode} className={'icon-resource'}/>
                        {Math.round(rew.amount)}
                    </p>))}
                </div>
            </div>
        </Modal>
    </React.Fragment>)
}

export default Quests;
