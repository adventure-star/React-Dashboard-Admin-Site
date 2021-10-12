import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Card, Divider
} from '@material-ui/core';

import { apiCropMasterHashDataById } from 'services/apis/cropmasters';
import NormalButton from 'components/NormalButton';


function SubTable1() {

  const [value, setValue] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {

    apiCropMasterHashDataById(localStorage.getItem("cropmasterId"))
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
  };

  return (
    <>
      {value != null &&
        <>
          <Card className="card-box card-shadow-first p-4 my-4 font-size-lg text-black">
            <div style={{ height: "300px", overflow: "auto", whiteSpace: "pre-wrap" }}>
              {value}
            </div>
            <Divider />
            <NormalButton label="更　新" />
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
export default connect(mapStateToProps, mapDispatchToProps)(SubTable1);
