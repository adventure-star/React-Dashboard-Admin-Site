import React from 'react';
import {
  TextField
} from '@material-ui/core';

const OneInputText = (props) => {

    const {
        changeAction : changeAction,
        label : label, 
        defaultValue : defaultValue,
        ...rest
    } = props;

    return (
        <TextField
            className="m-2 w-20"
            variant="outlined"
            onChange={changeAction}
            label={label}
            defaultValue={defaultValue}
            {...rest}
        />
    )
}

export default OneInputText;
