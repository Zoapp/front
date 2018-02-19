/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dialog, DialogBody, DialogFooter } from "zoapp-materialcomponents";

export default class ProcessingDialog extends Component {
  constructor(props) {
    super(props);
    const { open } = props;
    this.state = { openDialog: open };
  }

  componentWillReceiveProps(props) {
    if (this.props.open !== props.open) {
      this.setState({ openDialog: props.open });
    }
  }

  handleOpenDialog = () => {
    this.setState({
      openDialog: true,
    });
  }

  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
    });
    if (this.props.onClosed instanceof Function) {
      this.props.onClosed();
    }
  }

  render() {
    return (
      <Dialog
        open={this.state.openDialog}
        onClose={this.handleCloseDialog}
        header="Processing"
        style={{ width: "320px" }}
      >
        <DialogBody>
                  Please wait ...
        </DialogBody>
        <DialogFooter />
      </Dialog>
    );
  }
}

ProcessingDialog.defaultProps = {
  open: true,
  onClosed: null,
};

ProcessingDialog.propTypes = {
  open: PropTypes.bool,
  onClosed: PropTypes.func,
};
