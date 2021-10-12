import React, { useState, useEffect } from 'react';
import {
    FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, makeStyles
} from '@material-ui/core';

import { apiDropdown } from 'services/apis/dropdown';
import clsx from 'clsx';

function StyledRadio(props) {

    const classes = useStyles();

    return (
      <Radio
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        {...props}
      />
    );
  }
  const useStyles = makeStyles({
    root: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: '50%',
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
  });

const FreebieRadioGroup = (props) => {

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
                    console.log("==freebie", res);
                }
            })
            .catch(function (error) {
                console.log('===== error: ', error);
            });
    };

    return (
        <div>
            {options && options.dataset &&
                <FormControl component="fieldset" className="m-2 w-50">
                    <FormLabel component="legend">景品</FormLabel>
                    <RadioGroup defaultValue="0" aria-label="freebie" name="customized-radios" style={{ display: "inline" }} value={defaultValue} onChange={changeAction}>
                        {options.dataset.map(option => (
                            <FormControlLabel key={option.id} value={String(option.value)} control={<StyledRadio />} label={option.name} />
                        ))}
                    </RadioGroup>
                </FormControl>
            }
        </div>
    )
}

export default FreebieRadioGroup;
