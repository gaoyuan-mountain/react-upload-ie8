import React from 'react';

class ChooseFileBtn extends React.Component {
  constructor(props) {
    super(props);

    this.fileChange = this.fileChange.bind(this);
    this.beforeChoose = this.beforeChoose.bind(this);
  }

  fileChange() {
    this.context.fileUpload.afterChoose();
  }

  beforeChoose() {
    this.context.fileUpload.beforeChoose();
  }

  render() {
    return (
      <div className="choose-btn-wrapper" onClick={this.beforeChoose}>
        <input type="file" onChange={this.fileChange} />
      </div>
    )
  }
};

ChooseFileBtn.contextTypes = {
  fileUpload: React.PropTypes.object.isRequired
};

export default ChooseFileBtn;
