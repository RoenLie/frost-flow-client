type ModalSize = 'small' | 'medium' | 'large' | 'xlarge' | 'full';
interface IModalWrapperProps {
   children?: never[];
   id?: string;
   component: any;
   onClose?: () => void;
   resizeable?: boolean;
   moveable?: boolean;
   size?: ModalSize;
   logger?: IModalLogger;
   passthrough?: unknown;
}
interface IModalLogger {
   logInfo: ( msg: string ) => void;
}