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
  Avatar,
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

import { apiItemMasters, apiItemMasterCSV } from 'services/apis/itemmasters';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import FullDropDown from 'components/FullDropDown';
import NormalButton from 'components/NormalButton';

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
  { id: 'item_id', numeric: false, disablePadding: false, label: 'アイテムID', state: true },
  { id: 'category_id', numeric: false, disablePadding: false, label: '店舗', state: true },
  { id: 'action_id', numeric: false, disablePadding: false, label: 'アクションID', state: true },
  { id: 'name', numeric: false, disablePadding: false, label: '名称', state: true },
  { id: 'image', numeric: false, disablePadding: false, label: '画像', state: false },
  { id: 'point', numeric: false, disablePadding: false, label: '購入ポイント', state: true },
  { id: 'description', numeric: false, disablePadding: false, label: '簡易説明', state: true },
  { id: 'status', numeric: false, disablePadding: false, label: 'ステータス', state: true },
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
            {headCell.state &&
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
            }
            {!headCell.state &&
              <span>{headCell.label}</span>
            }
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
  const [itemmasters, setItemMasters] = useState({});

  const [order_type, setOrder] = useState('');
  const [order_by, setOrderBy] = useState('item_id');

  const [itemtype, setItemType] = useState(localStorage.getItem("itemtype") == null ? 1 : localStorage.getItem("itemtype"));

  const handleItemType = event => {
    setItemType(event.target.value);
  };

  useEffect(() => {
    getItemMasters();
    localStorage.setItem("itemtype", itemtype);
    console.log("==itemtype", itemtype);
  }, [per_page, page_no, itemtype, order_by, order_type]);

  const getItemMasters = () => {

    apiItemMasters(itemtype, { per_page, page_no, order_by, order_type, ...keywords })
      .then(res => {
        console.log('===== res: ', res);
        if (res) {
          setItemMasters(res);
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

  const exportCSV = () => {
    apiItemMasterCSV()
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
        <FullDropDown id="type" label="" param="/enums/list_by_enum_id/?enum_id=crop.itemType" defaultValue={itemtype} changeAction={handleItemType} />
        <Box className={classes.buttonsInnerWrapper}>
          <NormalButton label="CSVダウンロード" onClick={exportCSV} />
          <Tooltip arrow title="新規">
            <Link to="/AdminItemMasterAdd">
              <Fab size="medium" color="primary" aria-label="search" className="m-2">
                <AddIcon color="inherit" />
              </Fab>
            </Link>
          </Tooltip>
        </Box>
      </Toolbar>
      <Table stickyHeader className={classes.table} aria-label="Configs">
        <EnhancedTableHead
          classes={classes}
          order_type={order_type}
          order_by={order_by}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {(itemmasters.pagination && (itemmasters.pagination.total_count > 0)) && itemmasters.dataset.map(itemmaster => (
            <TableRow key={itemmaster.id}>
              <TableCell component="th" scope="row">
                <Link to={{ pathname: "/AdminItemMasterModify", state: { id: itemmaster.id } }} style={{ textDecoration: 'underline' }}>
                  {itemmaster.item_id}
                </Link>
              </TableCell>
              <TableCell>{itemmaster.category_id}</TableCell>
              <TableCell>{itemmaster.action_id}</TableCell>
              <TableCell>{itemmaster.name}</TableCell>
              <TableCell>
                <Avatar alt="-" variant="square" src={itemmaster.item_image} className={classes.large} />
              </TableCell>
              <TableCell>{itemmaster.point}</TableCell>
              <TableCell>{itemmaster.description}</TableCell>
              <TableCell>{itemmaster.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={0}
              count={itemmasters.pagination ? itemmasters.pagination.total_count : 0}
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailTable);
