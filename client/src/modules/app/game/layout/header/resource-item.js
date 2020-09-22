import React, {useState, useEffect} from 'react';
import SvgLoader from './../../../../../shared/components/svg';
import ReactTooltip from 'react-tooltip';

const ResourceItem = ({resource}) => {


    const [amount, setAmount] = useState(0);

    useEffect(() => {
        setAmount(resource.amount.amount);
    }, [resource ? resource.amount.amount : resource]);


    return (<div className={'resource-item'}>
        {/*<label>{resource.amount.name}</label>*/}
        <SvgLoader
            scope={'resources'}
            icon={resource.amount.resourceCode}
            width={20}
            height={20}
            className={'icon-resource'}
            data-tip={`<span><p>${resource.amount.name}</p>`
            + (resource.production.amount ? `<p>Production: ${Math.round(resource.production.amount)}/h</p>` : '')
            + (resource.amount.isStoreable ? `<p>Capacity: ${Math.round(resource.capacity.amount)}</p>` : '')
            + (resource.reserved && resource.reserved.amount ? `<p>Busy: ${Math.round(resource.reserved.amount)}</p>` : '')
                + '</span>'
            }
            data-html={true}
        />
        <span>{Math.round(amount)}</span>
        <ReactTooltip/>
    </div>)

}

export default ResourceItem;
