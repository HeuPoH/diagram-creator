import { Button } from 'shared/components/button/button';
import classes from 'shared/components/modal/modal.module.css';

type Props = React.PropsWithChildren & {
  onClose(): void;
  closeOnOverlayClick?: boolean;
};

export function Modal({ children, onClose, closeOnOverlayClick }: Props) {
  return (
    <div
      role='dialog'
      className={classes.modalOverlay}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <section className={classes.modalContent} onClick={e => e.stopPropagation()}>
        <button className={classes.modalClose} onClick={onClose}>&times;</button>
        <div style={{ padding: 10 }}>
          {children}
        </div>
      </section>
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
      <Button className={classes.modalButtonOk} onClick={onOk}>OK</Button>
      <Button className={classes.modalButtonCancel} onClick={onCancel}>Отмена</Button>
    </div>
  );
};