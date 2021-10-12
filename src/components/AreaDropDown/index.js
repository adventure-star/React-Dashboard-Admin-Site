import React, { useState, useEffect } from 'react';
import {
  TextField
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { apiRegions } from 'services/apis/regions';

const AreaDropDown = (props) => {

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

    apiRegions()
      .then(res => {
        if (res) {
          console.log("=====area", res);
          setOptions(res);
        }
      })
      .catch(function (error) {
        console.log('===== error: ', error);
      });
  };

  return (
    <div>
      {(options.pagination && (options.pagination.total_count > 0)) &&
        <TextField
          className="m-2 w-50"
          id={props.id}
          select
          label={label}
          value={defaultValue}
          onChange={changeAction}
          variant="outlined"
        >
          {options.dataset.map(option => (
            <MenuItem key={option.id} value={option.object_id}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
      }
    </div>
  )
}

export default AreaDropDown;
