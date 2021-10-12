import React, { Fragment, useEffect, useState } from 'react';

import { PageTitle } from 'layout-components';
import { Grid, Card } from '@material-ui/core';
import { connect } from 'react-redux';
import { apiOverview1, apiOverview2 } from 'services/apis/overview';

const Overview = (props) => {

  const [data1, setData1] = useState({});

  useEffect(() => {

    getOverview();

  }, []);

  const getOverview = () => {

    apiOverview1()
      .then(res => {
        console.log('===== res: ', res);
        if (res) {
          setData1(res);
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        console.log('===== error: ', error);
        // ...
      });

  }

  return (
    <Fragment>
      <PageTitle
        titleHeading="会員状況"
        titleDescription=""
      />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={8}>
          <Fragment>
            <Card className="card-box mb-4 pt-4">
              <div className="card-body pt-2 px-4 pb-4">
                <table className="table-alternate text-nowrap mb-0 table table-borderless table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      <th className="text-center">会員数</th>
                      <th className="text-center">本日入会</th>
                      <th className="text-center">本日退会</th>
                    </tr>
                  </thead>
                  <tbody style={{borderBottom: "1px solid lightgray"}}>
                    {data1 && data1.terminals && data1.terminals.map(data => (
                      <tr key={data.member_reserved1}>
                        <td>
                          <span className="font-weight-bold text-black">{data.enum_id}</span>
                        </td>
                        <td className="text-center">
                          <span className="font-weight-bold">{data.total_members}</span>
                        </td>
                        <td className="text-center">
                          <span className="text-success font-weight-bold">{data.members_joined_today}</span>
                        </td>
                        <td className="text-center">
                          <span className="text-danger font-weight-bold">{data.members_left_today}</span>
                        </td>
                      </tr>
                    ))}

                    </tbody>
                    <tfoot>
                    {data1 && data1.total &&
                      <tr>
                        <td>
                          <span className="font-weight-bold text-black">計</span>
                        </td>
                        <td className="text-center">
                          <span className="font-weight-bold">{data1.total.total_members}</span>
                        </td>
                        <td className="text-center">
                          <span className="text-success">{data1.total.total_members_joined_today}</span>
                        </td>
                        <td className="text-center">
                          <span className="text-danger font-weight-bold">{data1.total.total_members_left_today}</span>
                        </td>
                      </tr>
                    }
                  </tfoot>
                </table>
              </div>
            </Card>
          </Fragment>
        </Grid>
        <Grid item xs={12} sm={12} md={4} className="">
          <Card className="card-box card-shadow-first p-4 mb-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-first text-white text-center font-size-lg mr-3">
              </div>
              <div className="font-size-lg text-black-50">FB投稿</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center py-3 justify-content-center">
              <div>667件</div>
            </div>
          </Card>
          <Card className="card-box card-shadow-first p-4 mb-4">
            <div className="d-flex align-items-center">
              <div className="d-40 rounded-circle bg-first text-white text-center font-size-lg mr-3">
              </div>
              <div className="font-size-lg text-black-50">七夕結果</div>
            </div>
            <div className="display-3 text-center line-height-sm text-second text-center d-flex align-items-center py-3 justify-content-center">
              <div>1393件</div>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Overview);
