import React from "react";

export default class ProfileStatuese extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  };
  componentDidMount() {
    console.log("componentDidMount");
  }

  activateMode = () => {
    this.setState({
      editMode: true
    });
  };

  deActivateMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatusThunk(this.state.status);
  };

  addText = (e) => {
    this.setState({ status: e.currentTarget.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status != this.props.status) {
      this.setState({
        status: this.props.status
      });
    }
  }

  render() {
    console.log("render");
    return (
      <>
        {!this.state.editMode ? (
          <div>
            <span onDoubleClick={this.activateMode}>
              {this.props.status || "NO STATUS"}
            </span>
          </div>
        ) : (
          <div>
            <input
              onChange={this.addText}
              autoFocus={true}
              onBlur={this.deActivateMode}
              value={this.state.status}
            />
          </div>
        )}
      </>
    );
  }
}