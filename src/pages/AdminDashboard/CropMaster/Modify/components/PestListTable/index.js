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
  Avatar
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { useTheme } from '@material-ui/core/styles';

import { apiPestList, apiPestListById, apiHashDataAdd, apiCropMasterPetAdd, apiCropMasterPestRemove } from 'services/apis/cropmasters';
import NormalButton from 'components/NormalButton';
import OneInputTextSmall from 'components/OneInputTextSmall';
import { MenuItem } from 'react-contextmenu';
import PestImage from 'components/PestImage';

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

function PestListTable() {

  const classes = useStyles2();
  const [page, setPage] = useState(0);

  const [per_page, setPerPage] = useState(10);
  const [page_no, setPageNo] = useState(1);
  const [keywords, setKeywords] = useState({});
  const [pests, setPests] = useState([]);
  const [allpests, setAllPests] = useState([]);


  const [selected, setSelected] = useState(1);
  const handleSelected = event => {
    setSelected(event.target.value);
  };

  const [levelmin, setLevelMin] = useState("");
  const handleLevelMin = event => {
    setLevelMin(event.target.value);
  };

  const [levelmax, setLevelMax] = useState("");
  const handleLevelMax = event => {
    setLevelMax(event.target.value);
  };

  const [probability, setProbability] = useState("");
  const handleProbability = event => {
    setProbability(event.target.value);
  };

  const [selectedList, setSelectedList] = useState([]);
  const [allPestListById, setAllPestListById] = useState([]);

  const addItem = () => {

    var data = {
      crop_id: localStorage.getItem("cropMasterId"),
      disease_id: selected,
      level_from: levelmin,
      level_to: levelmax,
      probability: probability
    }

    apiCropMasterPetAdd(data)
      .then(res => {
        console.log('===== additems: ', res);
        if (res) {
          getPestListByIdPerPage();
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

    setSelected(pests[selected != pests[0].id ? 0 : 1].id);
    setLevelMin("");
    setLevelMax("");
    setProbability("");

  };

  useEffect(() => {
    getPestList();
    getAllPestListById();
    getPestListByIdPerPage();
  }, [per_page, page]);

  useEffect(() => {
    setPestsForDropDown();
  }, [allpests, selectedList]);

  const getPestList = () => {

    apiPestList({ per_page: 100000, page_no: 1, keywords: {} })
      .then(res => {
        console.log('===== pestlist: ', res);
        if (res) {
          setAllPests(res.dataset);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  };

  const getAllPestListById = () => {

    apiPestListById(localStorage.getItem("cropMasterId"), { per_page: 100000, page_no: 1, keywords: {} })
      .then(res => {
        console.log('===== byId: ', res);
        if (res) {
          setAllPestListById(res.dataset);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

  }

  const getPestListByIdPerPage = () => {

    apiPestListById(localStorage.getItem("cropMasterId"), { per_page, page_no, ...keywords })
      .then(res => {
        console.log('===== byId: ', res);
        if (res) {
          setSelectedList(res);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

  }

  const setPestsForDropDown = () => {

    setPests(() => {

      return allpests.filter(function (obj) {
        var sum = 0;
        for (var i = 0; i < allPestListById.length; i++) {
          if (obj.id !== allPestListById[i].disease_id) {
            sum++;
          }
        }
        return sum === allPestListById.length;
      });
    });

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPageNo(newPage + 1);
  };

  const handleChangeRowsPerPage = event => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPageNo(1);
  };

  const removeItem = (id) => {

    apiCropMasterPestRemove(id)
      .then(res => {
        console.log('===== deleteitem: ', res);
        if (res) {
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        getPestListByIdPerPage();
        // ...
      });

  }

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Toolbar className={classes.buttonsOuterWrapper}>
        {pests !== [] &&
          <>
            <TextField
              className="m-2"
              select
              label="病害虫"
              value={selected}
              onChange={handleSelected}
              variant="outlined"
            >
              {pests.map(pest => (
                <MenuItem key={pest.id} value={pest.id}>
                  {pest.name}
                </MenuItem>
              ))}
            </TextField>
            {/* <PestImage src={selected} /> */}
          </>
        }
        <OneInputTextSmall label="発生最小レベル" value={levelmin} changeAction={handleLevelMin} type="number" />
        <OneInputTextSmall label="発生最大レベル" value={levelmax} changeAction={handleLevelMax} type="number" />
        <OneInputTextSmall label="発生確率" value={probability} changeAction={handleProbability} type="number" />
        <NormalButton label="登　録" onClick={addItem} />
      </Toolbar>
      <Table stickyHeader className={classes.table} aria-label="Configs">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>病害虫</TableCell>
            <TableCell>画像</TableCell>
            <TableCell>発生レベル</TableCell>
            <TableCell>発生レベル</TableCell>
            <TableCell>発生確率</TableCell>
            <TableCell>削　除</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedList !== [] && selectedList.length != 0 && selectedList.dataset.map(item => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>{item.disease_name}</TableCell>
              <TableCell>
                <Avatar alt="-" variant="square" src={item.disease_image} className={classes.large} />
              </TableCell>
              <TableCell>{item.level_from}</TableCell>
              <TableCell>{item.level_to}</TableCell>
              <TableCell>{item.probability}</TableCell>
              <TableCell>
                <NormalButton label="削　除" onClick={() => removeItem(item.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              colSpan={0}
              count={selectedList.pagination ? selectedList.pagination.total_count : 0}
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
export default connect(mapStateToProps, mapDispatchToProps)(PestListTable);
