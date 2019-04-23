import { UploadFile } from 'antd/lib/upload/interface';

export interface IState {
  loading: boolean;
  previewVisible: boolean;
  previewImage: string;
  fileList: UploadFile[];
}

export const initialState: IState = {
  loading: false,
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
    case 'CANCEL':
      return { ...state, previewVisible: false };
    case 'CHANGE':
      return { ...state, fileList: action.payload };
    case 'TOGGLELOADING':
      return { ...state, loading: action.payload };      
    default:
      return state;
  }
}
