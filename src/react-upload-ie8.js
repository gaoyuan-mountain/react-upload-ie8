import React from 'react';

const noopFn = () => {};

const supportFormData = () => window.FormData !== undefined;

class FileUpload extends React.Component {
  static defaultProps = {

  };

  static propTypes = {
    config: React.PropTypes.shape({
      url: React.PropTypes.string,
      extraFields: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.func]),
      acceptFileType: React.PropTypes.string,
      beforeChoose: React.PropTypes.func,
      afterChoose: React.PropTypes.func,
      beforeUpload: React.PropTypes.func,
      startUpload: React.PropTypes.func,
      uploading: React.PropTypes.func,
      success: React.PropTypes.func,
      error: React.PropTypes.func,
      fail: React.PropTypes.func
    }).isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  };

  updateProps(props = {
    url: '',
    extraFields: {},
    acceptFileType: '',
    fileFieldName: 'file',
    afterChoose: noopFn,
    beforeUpload: noopFn,
    startUpload: noopFn,
    uploading: noopFn,
    success: noopFn,
    error: noopFn,
    fail: noopFn
  }) {
    this.callbackFn = {};
    Object.assign(this.callbackFn, props.config);

    //设置chooseBtn和uploadtn
    let chooseBtn, uploadBtn;
    React.Children.map(props.children, (child) => {
      if(child.ref === 'chooseBtn') {
        chooseBtn = child;
      }

      if(child.ref === 'uploadBtn') {
        uploadBtn = child;
      }
    });

    this.setState({
      chooseBtn,
      uploadBtn
    });
  }

  changeHandler(event) {
    let files;
    event.dataTransfer ? files = event.dataTransfer.files :
      event.target ? files = event.target.files : '';
    this.files = files;
    this.afterChoose(files);
  }

  uploadWithFormData() {
    if(!this.files) {
      return;
    }
    const formData = new FormData();
    //挂载文件
    formData.append(this.fileFieldName, this.files[0]);
    //挂在额外的字段
    for(let extraField in this.extraFields) {
      formData.append(extraField, this.extraFields[extraField]);
    }
  }

  startUpload() {
    this.callbackFn.beforeUpload();
    this.callbackFn.startUpload();
  }

  constructor(props) {
    super(props);

    this.state = {
      chooseBtn: null,
      ploadBtn: null
    };

    this.supportFormData = supportFormData();
  }

  getChildContext() {
    return {
      fileUpload: {
        afterChoose: this.callbackFn.afterChoose,
        beforeChoose: this.callbackFn.beforeChoose,
        beforeUpload: this.callbackFn.beforeUpload,
        startUpload: this.startUpload.bind(this)
      }
    }
  }

  componentWillMount() {
    this.updateProps(this.props);
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
};


FileUpload.childContextTypes = {
  fileUpload: React.PropTypes.object
};

export default FileUpload;
