import React, { useState, useEffect } from 'react';
import {
  TextField
} from '@material-ui/core';

const OneInputText = (props) => {

    const {
        label : label, 
        value : value, 
        defaultValue : defaultValue,
        changeAction : changeAction,
        ...rest
    } = props;

    return (
        <TextField
            className="m-2 w-50"
            variant="outlined"
            label={label}
            value={value}
            defaultValue={defaultValue}
            onChange={changeAction}
            {...rest}
        />
    )
}

export default OneInputText;
