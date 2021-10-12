import React from 'react';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const OneDatePicker = (props) => {

    return (
        <div style={{display:"flex", alignItems:"center"}}>
            <span style={{display:"inline", marginTop:"auto", marginBottom:"auto"}} className="pr-4">{props.title}</span>
            <MuiPickersUtilsProvider utils={DateFnsUtils} style={{display:"inline"}}>
            <KeyboardDatePicker
                margin="normal"
                label="Date"
                format="MM/dd/yyyy"
                value={props.value}
                onChange={props.changeAction}
                KeyboardButtonProps={{
                'aria-label': 'change date'
                }}
            />
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default OneDatePicker;
