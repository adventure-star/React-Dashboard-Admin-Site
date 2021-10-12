import React from 'react';
import {
  TextField
} from '@material-ui/core';

const LongTextArea = (props) => {

    const {
        defaultValue: defaultValue,
        changeAction: changeAction,
        ...rest
    } = props;

    return (
        <TextField
            className="m-2 w-50"
            multiline
            rows="16"
            defaultValue={defaultValue}
            onChange={changeAction}
            variant="outlined"
            {...rest}
        />
    )

}

export default LongTextArea;
