import React, { Fragment } from 'react';
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
} from '@material-ui/core';

const LicenseSection = () => {
  return (
    <Fragment>
      <div className="bg-white text-center license-container">
        <div className="text bg-gray-1000">&copy;2020 Johnshub</div>
      </div>
    </Fragment>
  );
};
export default LicenseSection;
