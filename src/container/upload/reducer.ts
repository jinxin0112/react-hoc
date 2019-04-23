import { UploadFile } from 'antd/lib/upload/interface';

export interface IState {
  previewVisible: boolean;
  previewImage: string;
  fileList: UploadFile[];
}

export const initialState: IState = {
  previewVisible: false,
  previewImage: '',
  fileList: []
};

interface IAction {
  type: string;
  payload?: any;
}

export function reducer(state: IState, action: IAction) {
  switch (action.type) {
    case 'PREVIEW':
      return { ...state, previewImage: action.payload, previewVisible: true };
    case 'CHANGE':
      return { ...state, fileList: action.payload };
    default:
      return state;
  }
}
