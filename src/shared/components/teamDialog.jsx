import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogFooter, LinearProgress } from "zrmc";

class TeamDialog extends React.Component {
  render() {
    const {
      onSubmit,
      onClose,
      header,
      width,
      children,
      isLoading,
      error,
      footer,
    } = this.props;

    return (
      <form onSubmit={onSubmit}>
        <Dialog
          id="team-dialog"
          onClose={onClose}
          header={header}
          width={width}
        >
          {children}
          {isLoading ? (
            <LinearProgress buffer={0} indeterminate />
          ) : (
            <div className="authenticate_error">{error}</div>
          )}
          <DialogFooter> {React.Children.map(footer, (c) => c)} </DialogFooter>
        </Dialog>
      </form>
    );
  }
}

TeamDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default TeamDialog;
