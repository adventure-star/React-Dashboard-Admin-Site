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
  IconButton,
  Paper,
  TableSortLabel
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';

import { apiUserFarmerMasterCropDataById } from 'services/apis/user_users';
import { Link } from 'react-router-dom';

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
    paddingTop: 20
  },
  table: {
    minWidth: 500,
    paddingLeft: 20,
    paddingRight: 20
  },
  tablebody: {
    maxHeight: 750,
  },
  buttonsOuterWrapper: {
    position: "relative"
  },
  buttonsInnerWrapper: {
    position: "absolute",
    right: 20
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
});

const headCells = [
  { id: 'id', numeric: false, disablePadding: false, label: '農場ID' },
  { id: 'name', numeric: false, disablePadding: false, label: '農場名' },
  { id: 'crop_name', numeric: false, disablePadding: false, label: '作物' },
  { id: 'level', numeric: false, disablePadding: false, label: 'レベル' },
  { id: 'str_status', numeric: false, disablePadding: false, label: '状態' },
  { id: 'item_point', numeric: false, disablePadding: false, label: '購入ポイント' },
  { id: 'used_point', numeric: false, disablePadding: false, label: '使用ポイント' },
  { id: 'result', numeric: false, disablePadding: false, label: '獲得ポイント' },
  { id: 'product', numeric: false, disablePadding: false, label: '商品' },
  { id: 'create_date', numeric: false, disablePadding: false, label: '開始日' },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order_type,
    order_by,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={order_by === headCell.id ? (order_type === '-' ? 'desc' : 'asc') : false}>
            <TableSortLabel
              active={order_by === headCell.id}
              direction={order_by === headCell.id ? (order_type === '-' ? 'desc' : 'asc') : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {order_by === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order_type === '-' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order_type: PropTypes.oneOf(['', '-']).isRequired,
  order_by: PropTypes.string.isRequired,
};

function CropDataTable(props) {

  const classes = useStyles2();
  const [page, setPage] = useState(0);

  const [page_no, setPageNo] = useState(1);
  const [per_page, setPerPage] = useState(10);
  const [keywords, setKeywords] = useState({});
  const [members, setMembers] = useState({});

  const [order_type, setOrder] = useState('');
  const [order_by, setOrderBy] = useState('id');

  useEffect(() => {
    getData();
  }, [per_page, page_no, order_by, order_type]);

  const getData = () => {

    apiUserFarmerMasterCropDataById(props.id !== null ? props.id : localStorage.getItem("memberId"), { per_page, page_no, order_by, order_type, ...keywords })
      .then(res => {
        console.log('===== res: ', res);
        if (res) {
          setMembers(res);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageNo(newPage + 1);
  };

  const handleChangeRowsPerPage = async event => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPageNo(1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = order_by === property && order_type === '';
    setOrder(isAsc ? '-' : '');
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="Members">
        <EnhancedTableHead
          classes={classes}
          order_type={order_type}
          order_by={order_by}
          onRequestSort={handleRequestSort}
        />
        <TableBody className={classes.tablebody}>
          {(members.pagination && (members.pagination.total_count > 0)) && members.dataset.map(member => (
            <TableRow key={member.id}>
              <TableCell component="th" scope="row">
                <Link to="/UserFarmerMaster" style={{ textDecoration: 'underline' }}>
                  {member.id}
                </Link>
              </TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.crop_name}</TableCell>
              <TableCell>{member.level}</TableCell>
              <TableCell>{member.str_status}</TableCell>
              <TableCell>{member.item_point}</TableCell>
              <TableCell>{member.used_point}</TableCell>
              <TableCell>{member.result}</TableCell>
              <TableCell>{member.product}</TableCell>
              <TableCell>{member.create_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={0}
              count={members.pagination ? members.pagination.total_count : 0}
              rowsPerPage={per_page}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'members per page' },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              style={{ paddingLeft: "auto", paddingRight: "auto" }}
            />
          </TableRow>
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
export default connect(mapStateToProps, mapDispatchToProps)(CropDataTable);
