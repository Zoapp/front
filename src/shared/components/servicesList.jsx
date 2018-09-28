/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemMeta } from "zrmc";
import Panel from "./panel";

const ServicesList = ({
  name,
  icon,
  description,
  items,
  onSelect,
  addDisabled,
  defaultIcon,
}) => (
  <Panel
    icon={icon}
    title={name}
    description={description}
    action="Add"
    actionDisabled={!!addDisabled}
    onAction={() => {
      if (onSelect) {
        onSelect({ name, state: "add" });
      }
    }}
  >
    <List>
      {items.map((item, index) => {
        /* const i = item.icon;
          item.status === "start"
            ? "play_circle_filled"
            : "play_circle_outline"; */
        let imgSrc;
        let i = item.icon || defaultIcon;
        if (i) {
          let { color } = item;
          if (!color) {
            color = "gray";
          }
          if (i.endsWith(".svg") || i.endsWith(".png")) {
            imgSrc = i;
            i = null;
          }
        }
        const color =
          item.status === "start" ? "zap-service_start" : "zap-service_stop";
        const classes = `selectableListItem zap-service_item ${color}`;
        const key = `sl_${index}`;
        return (
          <ListItem
            key={key}
            icon={i}
            imgSrc={imgSrc}
            className={classes}
            onClick={(e) => {
              e.preventDefault();
              let role;
              if (
                Object.prototype.hasOwnProperty.call(
                  e.target.attributes,
                  "role",
                )
              ) {
                role = e.target.attributes.role.value;
              }
              if (onSelect && role !== "button") {
                onSelect({
                  name,
                  state: "select",
                  index,
                  item,
                });
              }
            }}
          >
            <div>{item.title || item.name}</div>
            <ListItemMeta
              icon="remove"
              onClick={(e) => {
                e.preventDefault();
                if (onSelect) {
                  onSelect({ name, state: "delete", index });
                }
              }}
            />
          </ListItem>
        );
      })}
    </List>
  </Panel>
);

ServicesList.defaultProps = {
  addDisabled: false,
};

ServicesList.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  defaultIcon: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSelect: PropTypes.func.isRequired,
  addDisabled: PropTypes.bool,
};

export default ServicesList;
