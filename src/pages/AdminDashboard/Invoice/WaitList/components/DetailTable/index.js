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
  Toolbar,
  Box
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';

import { apiInvoiceWaitList } from 'services/apis/invoices';
import NormalButton from 'components/NormalButton';
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

const DetailTable = () => {
  const classes = useStyles2();
  const [page, setPage] = useState(0);

  const [per_page, setPerPage] = useState(10);
  const [page_no, setPageNo] = useState(1);
  const [keywords, setKeywords] = useState({});
  const [invoices, setInvoices] = useState({});


  useEffect(() => {
    getInvoiceWaitList();
  }, [per_page, page_no, keywords]);

  const getInvoiceWaitList = () => {

    apiInvoiceWaitList({ per_page, page_no, ...keywords })
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

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Toolbar className={classes.buttonsOuterWrapper}>
        <Box className={classes.buttonsInnerWrapper}>
          <Link to="/AdminInvoices">
            <NormalButton label="戻　る" />
          </Link>
        </Box>
      </Toolbar>
      <Table stickyHeader className={classes.table} aria-label="Members">
        <TableHead>
          <TableRow>
            <TableCell>畑作成日</TableCell>
            <TableCell>農場ID</TableCell>
            <TableCell>農場名</TableCell>
            <TableCell>獲得ポイント</TableCell>
            <TableCell>作物ID</TableCell>
            <TableCell>作物名</TableCell>
            <TableCell>会員ID</TableCell>
            <TableCell>会員名</TableCell>
            <TableCell>会員ステータス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(invoices.pagination && (invoices.pagination.total_count > 0)) && invoices.dataset.map(invoice => (
            <TableRow key={invoice.id}>
              <TableCell component="th" scope="row">
                {invoice.create_date}
              </TableCell>
              <TableCell>{invoice.farm_id}</TableCell>
              <TableCell>{invoice.farm_name}</TableCell>
              <TableCell>{invoice.farm_result}</TableCell>
              <TableCell>{invoice.crop_id}</TableCell>
              <TableCell>{invoice.crop_name}</TableCell>
              <TableCell>{invoice.member_id}</TableCell>
              <TableCell>{invoice.member_name}</TableCell>
              <TableCell>{invoice.member_str_status}</TableCell>
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
