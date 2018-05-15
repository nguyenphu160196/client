import React from 'react';
import Snackbar from 'material-ui/Snackbar';

export default class SnackbarEx extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Snackbar
          contentStyle={this.props.contentStyle}
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={4000}
          onRequestClose={this.props.onRequestClose}
        />
      </div>
    );
  }
}