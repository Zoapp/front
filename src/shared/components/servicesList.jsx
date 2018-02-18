/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemMeta, Button } from "zoapp-materialcomponents";

const ServicesList = ({
  name,
  items,
  onSelect,
  addDisabled,
}) => (
  <div className="mrb-sublist">
    <div className="mrb-subheader">
      <Button
        raised
        className="mrb-subheader-right"
        disabled={!!addDisabled}
        onClick={(e) => { e.preventDefault(); if (onSelect) { onSelect({ name, state: "add" }); } }}
      >Add
      </Button>
      <h4>{name}</h4>
    </div>
    <List>{
      items.map((item, index) => {
        const icon = item.status === "start" ? "play_circle_filled" : "play_circle_outline";
        const color = item.status === "start" ? "service_start" : "service_stop";
        const classes = `selectableListItem ${color}`;
        const key = `sl_${index}`;
        return (
          <ListItem
            key={key}
            icon={icon}
            className={classes}
            onClick={(e) => {
              e.preventDefault(); if (onSelect) {
                onSelect({
                  name, state: "select", index, item,
                });
              }
            }}
          >
            {item.name}
            <ListItemMeta
              icon="close"
              onClick={(e) => {
                e.preventDefault();
                if (onSelect) {
                  onSelect({ name, state: "delete", index });
                }
              }}
            />
          </ListItem>
        );
      })
    }
    </List>
  </div>
);

ServicesList.defaultProps = {
  addDisabled: false,
};

ServicesList.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
  addDisabled: PropTypes.bool,
};

export default ServicesList;
