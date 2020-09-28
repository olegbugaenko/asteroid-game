import React, {useEffect, memo} from 'react';
import moment from 'moment';
import classNames from 'classnames'
import * as styles from './styles.css';
import Image from "./../../../shared/components/img";
import SvgLoader from "./../../../shared/components/svg";

//${building.code}

const Researches = ({researches, queue, getResearchesList, getResearchQueue, postToResearch}) => {

    useEffect(() => {
        getResearchesList();
        getResearchQueue();
    }, []);

    return (<React.Fragment>
        <div className={'paper'}>
            <div className={'queueItemsWrap'}>
                {!queue || queue.length <= 0 ? (<p>No items in queue</p>) : (
                    queue.map(item => (<div className={'queue-row columns'}>
                        <p>{item.name}({item.level})</p>
                        <div className={'bar'}>
                            <div className={'progress'} style={{width: `${(item.progress / item.maxprogress) * 100}%`}}></div>
                        </div>
                    </div> ))
                )}
            </div>
        </div>
        <div className={'paper'}>
            {researches && researches.filter(b => b.level > 0 || b.isUpgradeAvailable).map(research => (<div className={classNames('buildingCard','columns')}>
                <div className={classNames('column', 'name-col')}>
                    <p>{research.name} ({research.level})</p>
                    <div className={'img-container'}>
                        <Image scope={'researches'} icon={`${research.code}.jpg`} className={'buildingImage'}/>
                    </div>
                </div>
                <div className={classNames('column', 'descr')}>
                    <p>Here will be some description</p>
                    {research.isUpgradeAvailable && (<button className={'success-btn'} onClick={() => postToResearch(research.code)}>Research</button>)}
                </div>
                <div className={classNames('column', 'costs')}>
                    <p className={'title'}>Costs</p>
                    {research.cost && research.cost.filter(c => c.amount > 0 && c.isPrimary)
                        .map(c => (<p className={'resourceCost'}><SvgLoader scope={'resources'} icon={c.resourceCode} className={'icon-resource'}/> {Math.round(c.amount)}</p> ))}
                    {research.reserved && research.reserved.filter(c => Math.round(c.amount) !== 0 && c.isPrimary)
                        .map(c => (<p className={'resourceCost'}><SvgLoader scope={'resources'} icon={c.resourceCode} className={'icon-resource'}/> {Math.round(c.amount)}</p> ))}
                    <p className={'resourceCost'}>{
                        (moment.utc(research.time).diff(moment.utc(0), 'days') ?
                            moment.utc(research.time).diff(moment.utc(0), 'days')
                        +' days ' : '')
                        +moment.utc(research.time).format("HH:mm:ss")}</p>
                </div>
                <div className={classNames('column', 'costs')}>
                    <p className={'title'}>Production</p>
                    {research.production && research.production.filter(c => Math.round(c.amount * 100) !== 100)
                        .map(c => (<p className={'resourceCost'}><SvgLoader scope={'resources'} icon={c.resourceCode} className={'icon-resource'}/> {Math.round(c.amount * 100)}%</p> ))}
                </div>
            </div> ))}
        </div>
    </React.Fragment>)
}

export default memo(Researches);
