import React from 'react';
import FileUpload from '../../src/react-upload-ie8';
import ChooseFileBtn from '../../src/choose-file-btn';
import UploadFileBtn from '../../src/upload-file-btn';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.uploadOption = {
      url: 'http://127.0.0.1',
      beforeChoose: () => {alert('beforeChoose')},
      afterChoose: () => {alert('afterChoose')},
      beforeUpload: () => {alert('beforeUpload')},
      startUpload: () => {alert('startUpload')},
      uploading: () => {},
      success: () => {},
      error: () => {},
      fail: () => {}
    }
  }

  render() {
    return (
      <div className="home">
        Home
        <FileUpload config={this.uploadOption} className="file-upload">
          <ChooseFileBtn />
          <div className="upload-btn-wrapper">
            <UploadFileBtn />
          </div>
        </FileUpload>
      </div>
    );
  }
}

export default Home;
