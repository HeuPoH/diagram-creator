import { cn } from 'shared/utils/cn';

import classes from './button.module.css';

type Props = {
  children: string;
  className?: string;
  onClick(e: React.MouseEvent): void;
};
export const Button: React.FC<Props> = ({ children, onClick, className }) => {
  return <button className={cn(className, classes.button)} onClick={onClick}>{children}</button>;
};
