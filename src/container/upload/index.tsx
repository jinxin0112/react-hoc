import React, { useReducer, useEffect } from 'react';
import { Upload, Modal, Icon } from 'antd';
import { reducer, initialState } from './reducer';
import {
  UploadFile,
  UploadChangeParam,
  UploadProps
} from 'antd/lib/upload/interface';

export interface IMyUploadProps {
  action: string;
  maxLength?: number;
  fileList?: UploadFile[];
  onChange?(fileList: UploadFile[]): void;
}

const MyUpload: React.FC<IMyUploadProps> = props => {
  const {
    action,
    maxLength,
    fileList: propFileList,
    onChange: propOnChange
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const { previewVisible, previewImage, fileList } = state;

  useEffect(() => {
    dispatch({
      type: 'CHANGE',
      payload: propFileList
    });
  }, [propFileList]);

  function handlePreview(file: UploadFile) {
    dispatch({
      type: 'PREVIEW',
      payload: file.url || file.thumbUrl
    });
  }

  function handleChange({ fileList }: UploadChangeParam) {
    dispatch({
      type: 'CHANGE',
      payload: fileList
    });
    propOnChange && propOnChange(fileList);
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );

  const uploadProp: UploadProps = {
    action,
    fileList,
    listType: 'picture-card',
    onPreview: handlePreview,
    onChange: handleChange
  };

  const isCross: boolean = !!maxLength && maxLength <= fileList.length;

  return (
    <React.Fragment>
      <Upload {...uploadProp}>{isCross ? null : uploadButton}</Upload>
      <Modal visible={previewVisible} footer={null}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </React.Fragment>
  );
};

export { MyUpload };
export default MyUpload;
