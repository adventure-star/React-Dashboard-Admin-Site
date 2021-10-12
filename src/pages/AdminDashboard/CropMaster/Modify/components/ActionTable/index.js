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
  TextField,
  Box,
  Tooltip,
  Fab
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';

import { apiPestList, apiActionListByCropMasterId } from 'services/apis/cropmasters';
import NormalButton from 'components/NormalButton';
import OneInputTextSmall from 'components/OneInputTextSmall';
import { MenuItem } from 'react-contextmenu';
import PestImage from 'components/PestImage';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';


const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
            <KeyboardArrowLeft />
          )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
            <KeyboardArrowRight />
          )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

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

    apiActionListByCropMasterId(localStorage.getItem("cropMasterId"))
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
        <Box className={classes.buttonsInnerWrapper}>
          <Tooltip arrow title="新規">
            <Link to="/AdminCropMasterActionAdd">
              <Fab size="medium" color="primary" aria-label="search" className="m-2">
                <AddIcon color="inherit" />
              </Fab>
            </Link>
          </Tooltip>
        </Box>
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
                <Link to={{ pathname: "/AdminCropMasterActionModify", state: { id: action.id } }}>
                  {action.action_id}
                </Link>
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
