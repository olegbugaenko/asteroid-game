import React from 'react';
import classNames from 'classnames'
import ResourceItem from './resource-item';
import * as styles from './styles.css';

const Header = ({resources}) => {

    const mapToRows = (arr, perRow) => {
        const result = [];
        let row = [];
        arr.forEach(item => {
            row.push(item);
            if(row.length >= perRow) {
                result.push(row);
                row = [];
            }
        });
        if(row.length > 0) {
            result.push(row);
        }
        return result;
    }

    return (<div className={'columns'}>
        <div>
            Game
        </div>
        <div className={'row'}>
            {resources && mapToRows(resources.filter(resource => resource.amount.isPrimary), 4)
                .map(row => (<div className={classNames('columns','resources')}>
                    {row && row.map(resource => (<div className={'column'}>
                        <ResourceItem resource={resource} />
                        </div> ))}
                </div> ))
                }
        </div>
    </div>)
}

export default Header;
