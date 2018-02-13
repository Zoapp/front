/**
 * Copyright (c) 2015-present, CWB SAS
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";

class FileInput extends Component {
  handleFileChange = (selectorFiles) => {
    const file = selectorFiles[0];
    // console.log("handleFileChange file=", file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      if (this.props.onLoad) {
        this.props.onLoad(data, file.type);
      }
    };
    reader.readAsText(file);
  }

  render() {
    const { accept } = this.props;

    return (
      <div className="fileInput" >
        <i className="material-icons">cloud_upload</i>
        <input
          type="file"
          accept={accept}
          onChange={e => this.handleFileChange(e.target.files)}
        />
      </div>
    );
  }
}

FileInput.defaultProps = {
  onLoad: null,
  accept: null,
};

FileInput.propTypes = {
  onLoad: PropTypes.func,
  accept: PropTypes.string,
};

export default FileInput;
