/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemContent, Icon } from "zoapp-materialcomponents";

const ListComponent = ({
  items, selectedItem, onSelect, className, style,
}) => (
  <List className={className} style={style}>
    {items.map((item, index) => {
      let icon = null;
      let content = item.name;
      if (item.icon) {
        let { color } = item;
        if (!color) {
          color = "gray";
        }
        const st = {
          backgroundColor: color,
          padding: "8px",
        };
        if (item.icon.endsWith(".svg")) {
          icon = (
            <div style={st}>
              <img style={{ verticalAlign: "top" }} src={item.icon} alt={item.name} />
            </div>);
        } else if (item.icon.endsWith(".png")) {
          icon = (
            <div style={st}>
              <img style={{ verticalAlign: "top", width: "38px", margin: "-7px" }} src={item.icon} alt={item.name} />
            </div>);
        } else {
          icon = <div style={st}><Icon style={{ verticalAlign: "top" }} name={item.icon} /></div>;
        }
        content = <ListItemContent avatar={icon} >{content}</ListItemContent>;
      }
      let cn = "selectableListItem";
      if (selectedItem === index) {
        cn = "selectedListItem";
      }
      return (
        <ListItem
          key={item.id}
          onClick={(e) => { e.preventDefault(); onSelect(index); }}
          className={cn}
        >{content}
        </ListItem>);
    })}
  </List>
);

ListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string,
  })).isRequired,
  selectedItem: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ListComponent;
