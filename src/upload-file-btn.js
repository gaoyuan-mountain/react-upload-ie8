import React from 'react';

class UploadFileBtn extends React.Component {
  constructor(props) {
    super(props);

    this.startUpload = this.startUpload.bind(this);
  }

  startUpload() {
    this.context.fileUpload.startUpload();
  }

  render() {
    return (
      <div className="upload-btn-wrapper">
        <input type="button" value="Upload" onClick={this.startUpload} />
      </div>
    )
  }
};

UploadFileBtn.contextTypes = {
  fileUpload: React.PropTypes.object.isRequired
};

export default UploadFileBtn;
