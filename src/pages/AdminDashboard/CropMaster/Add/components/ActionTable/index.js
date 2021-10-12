import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  IconButton,
  Paper,
  TextField
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';

import { apiActionListByCropMasterId } from 'services/apis/cropmasters';

const useStyles2 = makeStyles({
  tableContainer: {
    maxHeight: 750
  },
  table: {
    minWidth: 500,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonsOuterWrapper: {
    position: "relative"
  },
  buttonsInnerWrapper: {
    position: "absolute",
    right: 20
  }
});

function ActionTable() {

  const classes = useStyles2();

  const [actions, setActions] = useState([]);

  useEffect(() => {
    getActions();
  }, []);

  const getActions = () => {

    apiActionListByCropMasterId(0)
      .then(res => {
        console.log('===== actionsbycropid: ', res);
        if (res) {
          setActions(res);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Toolbar className={classes.buttonsOuterWrapper}>
      </Toolbar>
      <Table stickyHeader className={classes.table} aria-label="Configs">
        <TableHead>
          <TableRow>
            <TableCell>action_id</TableCell>
            <TableCell>actiontype</TableCell>
            <TableCell>afteractionid</TableCell>
            <TableCell>beforeactionid</TableCell>
            <TableCell>crop_id</TableCell>
            <TableCell>limitday</TableCell>
            <TableCell>name</TableCell>
            <TableCell>nextphase</TableCell>
            <TableCell>phaseid</TableCell>
            <TableCell>startday</TableCell>
            <TableCell>sweetday</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actions !== [] && actions.map(action => (
            <TableRow key={action.action_id}>
              <TableCell component="th" scope="row">
                {action.action_id}
              </TableCell>
              <TableCell>{action.action_type}</TableCell>
              <TableCell>{action.after_action_id}</TableCell>
              <TableCell>{action.before_action_id}</TableCell>
              <TableCell>{action.crop_id}</TableCell>
              <TableCell>{action.limit_day}</TableCell>
              <TableCell>{action.name}</TableCell>
              <TableCell>{action.next_phase}</TableCell>
              <TableCell>{action.phase_id}</TableCell>
              <TableCell>{action.start_day}</TableCell>
              <TableCell>{action.sweet_day}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(ActionTable);
