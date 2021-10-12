import React from 'react';
import {
  TextField
} from '@material-ui/core';

const TextArea = (props) => {

    const {
        label : label,
        changeAction : changeAction,
        ...rest
    } = props;

    return (
        <TextField
            className="m-2 w-50"
            multiline
            onChange={changeAction}
            label={label}
            rows="4"
            variant="outlined"
            {...rest}
        />
    )

}

export default TextArea;
