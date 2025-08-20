import classes from './input.module.css';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange(value: string): void;
}

export const Input: React.FC<Props>= ({ value, onChange, ...rest }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classes.input}
      {...rest}
    />
  );
};
