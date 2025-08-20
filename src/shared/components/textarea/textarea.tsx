import classes from './textarea.module.css';

type Props = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> & {
  value: string;
  onChange(v: string): void;
};
export const Textarea: React.FC<Props> = ({ value, onChange, ...rest }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classes.textarea}
      {...rest}
    />
  );
};
