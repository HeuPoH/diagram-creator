import { PropsWithChildren } from 'react';

import classes from './form-group.module.css';

export const FormGroup: React.FC<PropsWithChildren<{ direction: 'row' | 'column' }>> = ({ children, direction }) => {
  return (
    <div
      className={direction === 'column'
        ? classes.formGroupColumn
        : classes.formGroupRow}
    >
      {children}
    </div>
  );
};
