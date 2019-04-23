import React, { useReducer, useEffect } from 'react';
import { Upload, Modal, Icon, message } from 'antd';
import { reducer, initialState } from './reducer';
import { UploadFile, UploadChangeParam, UploadProps } from 'antd/lib/upload/interface';

export interface IMyUploadProps {
  action: string;                                       // 上传的地址
  maxSize?: number;                                     // 最大尺寸 单位（MB）
  maxLength?: number;                                   // 最大文件数
  defaultFileList?: UploadFile[];                       // 默认文件列表
  fileType?: string[];                                  // 支持上传的文件类型
  onChange?(fileList: UploadFile[]): void;              // fileList 的 change 回调， 只会在 status 为 success 的时候触发
}

const StandardUpload: React.FC<IMyUploadProps> = props => {
  const {
    action,
    maxLength,
    maxSize,
    fileType,
    defaultFileList,
    onChange: propOnChange
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  const { previewVisible, previewImage, fileList, loading } = state;

  useEffect(() => {
    dispatch({
      type: 'CHANGE',
      payload: defaultFileList
    });
  }, []);

  function handlePreview(file: UploadFile) {
    dispatch({
      type: 'PREVIEW',
      payload: file.url || file.thumbUrl
    });
  }

  function handleCancel() {
    dispatch({
      type: 'CANCEL'
    });
  }

  function handleChange({ fileList, file: { status, error } }: UploadChangeParam) {
    switch (status) {
      case 'uploading':
        dispatch({
          type: 'TOGGLELOADING',
          payload: true
        });
        break;
      case 'success':
        propOnChange && propOnChange(fileList);
        break;
      case 'error':
        message.error(
          `${Object.values(error)[0]} : ${Object.values(error)[1]} - ${Object.values(error)[2]}`
        );
        break;
    }
    dispatch({
      type: 'TOGGLELOADING',
      payload: false
    });
    dispatch({
      type: 'CHANGE',
      payload: fileList
    });
  }

  function beforeUpload(file: UploadFile) {
    const isFileType: boolean = !(fileType && fileType.some(item => file.type === `image/${item}`));
    const isFileSize: boolean = !(maxSize && file.size / 1024 / 1024 > maxSize);
    if (!isFileType) {
      message.error(`仅支持格式为${fileType && fileType.join('/')}的文件`);
    }
    if (!isFileSize) {
      message.error(`不能超过${maxSize}MB!`);
    }
    return isFileType && isFileSize;
  }

  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">上传图片</div>
    </div>
  );

  const uploadProp: UploadProps = {
    action,
    fileList,
    beforeUpload,
    defaultFileList,
    listType: 'picture-card',
    onPreview: handlePreview,
    onChange: handleChange
  };

  const isCross: boolean = !!maxLength && maxLength <= fileList.length;

  return (
    <React.Fragment>
      <Upload {...uploadProp}>{isCross ? null : uploadButton}</Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </React.Fragment>
  );
};

export { StandardUpload };
export default StandardUpload;
