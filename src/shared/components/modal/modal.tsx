import { cn } from 'shared/utils/cn';
import classes from 'shared/components/modal/modal.module.css';

type Props = React.PropsWithChildren & {
  onClose(): void;
};

export function Modal({ children, onClose }: Props) {
  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
        <button className={classes.modalClose} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
};

type ModalButtonsProps = {
  onOk(): void;
  onCancel(): void;
};

export const ModalButtons: React.FC<ModalButtonsProps> = ({ onOk, onCancel }) => {
  return (
    <div className={classes.modalButtonsContainer}>
      <button className={cn(classes.modalButton, classes.ok)} onClick={onOk}>OK</button>
      <button className={cn(classes.modalButton, classes.cancel)} onClick={onCancel}>Cancel</button>
    </div>
  );
};
