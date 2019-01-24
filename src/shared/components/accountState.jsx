import React from "react";
import Proptype from "prop-types";

import { FormField, Select, TextField } from "zrmc";
import { MenuItem } from "zrmc/menu";

class AccountState extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <FormField style={{ display: "block" }}>
          <TextField
            label="User name"
            defaultValue={user.username}
            style={{ width: "100%" }}
            disabled
          />
        </FormField>
        <FormField style={{ display: "block" }}>
          <TextField
            label="User actual state"
            defaultValue={user.account_state}
            style={{ width: "100%" }}
            disabled
          />
        </FormField>
        <FormField style={{ display: "block" }}>
          <Select
            label="Choose new account state"
            style={{ width: "100%" }}
            onSelected={(selected) => {
              this.props.onChangeHandler("newState")({
                target: { value: selected },
              });
            }}
          >
            <MenuItem>enable</MenuItem>
            <MenuItem>disable</MenuItem>
          </Select>
        </FormField>
      </React.Fragment>
    );
  }
}

AccountState.propTypes = {
  user: Proptype.shape({
    username: Proptype.string.isRequired,
    account_state: Proptype.string.isRequired,
  }).isRequired,
  onChangeHandler: Proptype.func.isRequired,
};

export default AccountState;
