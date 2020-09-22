import React from 'react';

const ImgLoader = ({icon, scope, ...props}) => {
    const path = ""+`./../../../assets/img/${scope}/${icon}`;
    try{
        const src = require(""+`./../../../assets/img/${scope}/${icon}`);
        return <img src={src.default} {...props} />
    }
    catch(err){
        const npath = ""+`./../../../assets/img/buildings/noimage.jpg`;
        const nsrc = require(""+`./../../../assets/img/buildings/noimage.jpg`);
        return <img src={nsrc.default} {...props} />
    }

}

export default ImgLoader;
