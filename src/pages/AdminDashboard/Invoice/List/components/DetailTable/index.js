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
  Fab,
  Box,
  Button,
  Tooltip,
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

import { apiInvoices, apiInvoicesCSV } from 'services/apis/invoices';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import NormalButton from 'components/NormalButton';
import Moment from 'moment';
import { apiMembersCSV } from 'services/apis/users';

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
  { id: 'farm_id', numeric: false, disablePadding: false, label: '農場ID' },
  { id: 'product_id', numeric: false, disablePadding: false, label: '商品ID' },
  { id: 'member_id', numeric: false, disablePadding: false, label: '会員ID' },
  { id: 'addr_id', numeric: false, disablePadding: false, label: '登録番号' },
  { id: 'str_reserved1', numeric: false, disablePadding: false, label: '種別' },
  { id: 'name_kana_sei', numeric: false, disablePadding: false, label: '姓' },
  { id: 'name_kana_mei', numeric: false, disablePadding: false, label: '名' },
  { id: 'zip', numeric: false, disablePadding: false, label: '郵便番号' },
  { id: 'addr1', numeric: false, disablePadding: false, label: '住所１' },
  { id: 'update_date', numeric: false, disablePadding: false, label: '更新日' },
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

function DetailTable() {
  const classes = useStyles2();
  const [page, setPage] = useState(0);

  const [per_page, setPerPage] = useState(10);
  const [page_no, setPageNo] = useState(1);
  const [keywords, setKeywords] = useState({});
  const [invoices, setInvoices] = useState({});

  const [order_type, setOrder] = useState('');
  const [order_by, setOrderBy] = useState('farm_id');

  const [start, setStart] = useState(new Date("2000-01-01"));
  const [end, setEnd] = useState(new Date);


  useEffect(() => {
    getInvoices();
  }, [per_page, page_no, order_by, order_type, keywords]);

  const getInvoices = () => {

    apiInvoices({ per_page, page_no, order_by, order_type, ...keywords })
      .then(res => {
        console.log('===== res: ', res);
        if (res) {
          setInvoices(res);
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

  const handleChangeRowsPerPage = event => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPageNo(1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = order_by === property && order_type === '';
    setOrder(isAsc ? '-' : '');
    setOrderBy(property);
  };

  const handleStart = date => {
    setStart(date);
    setKeywords({ update_date__from: Moment(date).format('YYYY-MM-DD'), update_date__to: Moment(end).format('YYYY-MM-DD') });
  };

  const handleEnd = date => {
    setEnd(date);
    setKeywords({ update_date__from: Moment(start).format('YYYY-MM-DD'), update_date__to: Moment(date).format('YYYY-MM-DD') });
  };

  const onSearch = () => {

    console.log(keywords);

  }

  const exportCSV = () => {
    apiInvoicesCSV()
      .then(res => {
        console.log('===== res: ', res);
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  }

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Toolbar className={classes.buttonsOuterWrapper}>
        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ display: "inline" }}>
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={start}
              onChange={handleStart}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              style={{ marginRight: "10px" }}
            />
            <span>~</span>
            <KeyboardDatePicker
              margin="normal"
              label="Date"
              format="MM/dd/yyyy"
              value={end}
              onChange={handleEnd}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              style={{ marginLeft: "10px" }}
            />
          </MuiPickersUtilsProvider>
          <NormalButton label="検索" onClick={onSearch} />
        </div>
        <Box className={classes.buttonsInnerWrapper}>
          <NormalButton label="CSVダウンロード" onClick={exportCSV} />
          <Link to="/AdminInvoiceWaitList">
            <NormalButton label="送付保留リスト" />
          </Link>
          <Tooltip arrow title="新規">
            <Link to="/AdminInvoiceAdd">
              <Fab size="medium" color="primary" aria-label="search" className="m-2">
                <AddIcon color="inherit" />
              </Fab>
            </Link>
          </Tooltip>
        </Box>
      </Toolbar>
      <Table stickyHeader className={classes.table} aria-label="Members">
        <EnhancedTableHead
          classes={classes}
          order_type={order_type}
          order_by={order_by}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {(invoices.pagination && (invoices.pagination.total_count > 0)) && invoices.dataset.map(invoice => (
            <TableRow key={invoice.id}>
              <TableCell component="th" scope="row">
                <Link to={{ pathname: "/AdminInvoiceModify", state: { id: invoice.id } }} style={{ textDecoration: 'underline' }}>
                  {invoice.farm_id}
                </Link>
              </TableCell>
              <TableCell>{invoice.product_id}</TableCell>
              <TableCell>{invoice.member_id}</TableCell>
              <TableCell>{invoice.addr_id}</TableCell>
              <TableCell>{invoice.str_reserved1}</TableCell>
              <TableCell>{invoice.name_kana_sei}</TableCell>
              <TableCell>{invoice.name_kana_mei}</TableCell>
              <TableCell>{invoice.zip}</TableCell>
              <TableCell>{invoice.addr1}</TableCell>
              <TableCell>{invoice.update_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={0}
              count={invoices.pagination ? invoices.pagination.total_count : 0}
              rowsPerPage={per_page}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'invoices per page' },
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailTable);
