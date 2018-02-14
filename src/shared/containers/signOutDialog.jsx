/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Rmdc, { Dialog, DialogFooter, DialogBody, Button } from "zoapp-materialcomponents";
import { connect } from "react-redux";
import { signOut } from "../actions/auth";

class SignOutDialog extends Component {
  handleCloseDialog = () => {
    Rmdc.closeDialog();
    if (this.props.onClosed instanceof Function) {
      this.props.onClosed();
    }
  }

  handleSignOut = () => {
    const { provider, dispatch } = this.props;
    dispatch(signOut({ provider }));
    this.handleCloseDialog();
  }

  render() {
    return (
      <Dialog
        id={this.props.id}
        onClose={this.handleCloseDialog}
        header="Sign out"
        width="320px"
      >
        <DialogBody>
          <div>Are you ok ? </div>
        </DialogBody>
        <DialogFooter>
          <Button type="cancel" onClick={(e) => { e.preventDefault(); this.handleCloseDialog(); }}>Cancel</Button>
          <Button type="accept" onClick={(e) => { e.preventDefault(); this.handleSignOut(); }}>Yes</Button>
        </DialogFooter>
      </Dialog>
    );
  }
}

SignOutDialog.defaultProps = {
  id: null,
  onClosed: null,
  provider: null,
};

SignOutDialog.propTypes = {
  id: PropTypes.string,
  onClosed: PropTypes.func,
  provider: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(SignOutDialog);
