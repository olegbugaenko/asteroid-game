import React from 'react';

const SvgLoader = ({icon, scope, ...props}) => {
    return <img src={`../../assets/img/${scope}/${icon}.svg`} {...props} />
}

export default SvgLoader;
