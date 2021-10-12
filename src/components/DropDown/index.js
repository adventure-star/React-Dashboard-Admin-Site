import React, { useState, useEffect } from 'react';
import {
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { apiDropdown } from 'services/apis/dropdown';

const DropDown = (props) => {

  const [per_page, setPerPage] = useState(10000);
  const [page_no, setPageNo] = useState(1);
  const [keywords, setKeyWords] = useState({});

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

    apiDropdown(props.param, { per_page, page_no, ...keywords })
      .then(res => {
        console.log("=====res", res);
        if (res) {
          setOptions(res);
        }
      })
      .catch(function (error) {
        console.log('===== error: ', error);
      });
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      {options !== {} && options.dataset &&
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
            <MenuItem key={option.id} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      }
    </div>
  )
}

export default DropDown;
