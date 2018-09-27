import React from "react";
import { Button, Icon } from "zrmc";
import PropTypes from "prop-types";

const Panel = ({ children, icon, title, action, description }) => (
  <div className="zap-panel">
    <div className="zap-panel_header">
      <div className="zap-panel_title">
        {icon ? <Icon className="zap-panel_icon">{icon}</Icon> : ""}
        <div>{title}</div>
      </div>
      {action ? (
        <Button raised dense>
          {action}
        </Button>
      ) : (
        ""
      )}
    </div>
    <div className="zap-panel_desc">{description}</div>
    {children}
  </div>
);

Panel.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.string,
};

export default Panel;
