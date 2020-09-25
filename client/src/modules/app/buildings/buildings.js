import React, {useEffect, memo} from 'react';
import moment from 'moment';
import classNames from 'classnames'
import * as styles from './styles.css';
import Image from "./../../../shared/components/img";
import SvgLoader from "./../../../shared/components/svg";

//${building.code}

const Buildings = ({buildings, queue, getBuildingsList, getBuildingQueue, postToBuild}) => {

    useEffect(() => {
        getBuildingsList();
        getBuildingQueue();
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
            {buildings && buildings.filter(b => b.level > 0 || b.isUpgradeAvailable).map(building => (<div className={classNames('buildingCard','columns')}>
                <div className={classNames('column', 'name-col')}>
                    <p>{building.name} ({building.level})</p>
                    <div className={'img-container'}>
                        <Image scope={'buildings'} icon={`${building.code}.jpg`} className={'buildingImage'}/>
                    </div>
                </div>
                <div className={classNames('column', 'descr')}>
                    <p>Here will be some description</p>
                    {building.isUpgradeAvailable && (<button onClick={() => postToBuild(building.code)}>Build</button>)}
                </div>
                <div className={classNames('column', 'costs')}>
                    <p className={'title'}>Costs</p>
                    {building.cost && building.cost.filter(c => c.amount > 0 && c.isPrimary)
                        .map(c => (<p className={'resourceCost'}><SvgLoader scope={'resources'} icon={c.resourceCode} className={'icon-resource'}/> {Math.round(c.amount)}</p> ))}
                    {building.reserved && building.reserved.filter(c => Math.round(c.amount) !== 0 && c.isPrimary)
                        .map(c => (<p className={'resourceCost'}><SvgLoader scope={'resources'} icon={c.resourceCode} className={'icon-resource'}/> {Math.round(c.amount)}</p> ))}
                    <p className={'resourceCost'}>{
                        (moment.utc(building.time).diff(moment.utc(0), 'days') ?
                            moment.utc(building.time).diff(moment.utc(0), 'days')
                        +' days ' : '')
                        +moment.utc(building.time).format("HH:mm:ss")}</p>
                </div>
                <div className={classNames('column', 'costs')}>
                    <p className={'title'}>Production</p>
                    {building.production && building.production.filter(c => Math.round(c.amount) !== 0 && c.isPrimary)
                        .map(c => (<p className={'resourceCost'}><SvgLoader scope={'resources'} icon={c.resourceCode} className={'icon-resource'}/> {Math.round(c.amount)}</p> ))}
                </div>
            </div> ))}
        </div>
    </React.Fragment>)
}

export default memo(Buildings);
