import React, { useState, useEffect } from 'react';
import {
  TextField
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const StatusDropDown = (props) => {

  const {
    label: label,
    defaultValue: defaultValue,
    changeAction: changeAction,
    ...rest
  } = props;

  const options = [
    {name: "表示", value: 0},
    {name: "非表示", value: 1}
  ];

  return (
    <div>
      {options &&
        <TextField
          className="m-2 w-50"
          id={props.id}
          select
          label={label}
          value={defaultValue}
          onChange={changeAction}
          variant="outlined"
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      }
    </div>
  )
}

export default StatusDropDown;
