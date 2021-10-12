import React, { useState, useEffect } from 'react';
import {
  TextField
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { apiDropdown } from 'services/apis/dropdown';

const FullDropDown = (props) => {

  const {
    label: label,
    defaultValue: defaultValue,
    changeAction: changeAction,
    ...rest
  } = props;

  const [options, setOptions] = useState({});

  useEffect(() => {

    getOptionList();

  }, []);

  const getOptionList = function () {

    apiDropdown(props.param)
      .then(res => {
        if (res) {
          setOptions(res);
        }
      })
      .catch(function (error) {
        console.log('===== error: ', error);
      });
  };

  return (
    <div>
      {options && options.dataset &&
        <TextField
          className="m-2"
          id={props.id}
          select
          label={label}
          value={defaultValue}
          onChange={changeAction}
          variant="outlined"
        >
          {options.dataset.map(option => (
            <MenuItem key={option.id} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      }
    </div>
  )
}

export default FullDropDown;
