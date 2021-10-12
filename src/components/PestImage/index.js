import React from 'react';
import { Image } from 'react-feather';

const PestImage = (props) => {

    const {
        src: src,
        ...rest
    } = props;

    var url = "https://hatake.s3-ap-northeast-1.amazonaws.com/web-game/images/wapp/images/disease/" + src + ".gif/>";

    return (
        <div style={{border: "1px solid gray"}}>
            <img
                src={url}
                {...rest}
            />
        </div>
    )

}

export default PestImage;
