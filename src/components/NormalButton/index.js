import React from 'react';
import {
  Button
} from '@material-ui/core';

const NormalButton = (props) => {

    const {
        label : label, 
        ...rest
    } = props;

    return (
        <Button 
            variant="outlined" 
            color="primary" 
            className="m-2"
            {...rest}>
                {label}
        </Button>
    )
}

export default NormalButton;
