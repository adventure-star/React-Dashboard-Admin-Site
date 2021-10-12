import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, Divider
} from '@material-ui/core';

import { apiCropMasterHashDataById, apiHashDataUpdate } from 'services/apis/cropmasters';
import NormalButton from 'components/NormalButton';
import LongTextArea from 'components/LongTextArea';
import ReactHtmlParser from 'react-html-parser';


function HashTable() {

  const [value, setValue] = useState(null);
  const [hashId, setHashId] = useState(null);

  const handleValue = (event) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {

    apiCropMasterHashDataById(localStorage.getItem("cropMasterId"))
      .then(res => {
        console.log('===== res: ', res);
        if (res) {
          setValue(res.value);
          setHashId(res.id);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });
  };

  const hashDataUpdate = () => {

    var data = {
      key: "nana." + localStorage.getItem("cropMasterId"),
      value: value
    }

    console.log(data)

    apiHashDataUpdate(localStorage.getItem("cropMasterId"), data)
      .then(res => {
        console.log('===== res: ', res);
        if (res) {
          setValue(res.value);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

  }

  return (
    <>
      {value !== null &&
        <>
          <Card className="card-box card-shadow-first p-4 my-4 font-size-lg text-black">
            <LongTextArea defaultValue={ReactHtmlParser(value)} changeAction={handleValue}/>
            <Divider />
            <NormalButton label="更　新" onClick={hashDataUpdate} />
          </Card>
        </>
      }
    </>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(HashTable);
