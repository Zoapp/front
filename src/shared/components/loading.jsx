/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import { Card, CardTitle, CardText, CardActions } from "react-mdl";

const Loading = () => (
  <Card shadow={0} style={{ width: "512px", margin: "auto" }}>
    <CardTitle>Processing</CardTitle>
    <CardText>
              Please wait ...
    </CardText>
    <CardActions />
  </Card>);

Loading.propTypes = {
};

export default Loading;
