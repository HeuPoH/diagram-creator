import React from 'react';
import { cn } from 'shared/utils/cn';

import classes from './select.module.css';

interface SelectProps {
  options: { value: string; label: string }[];
  value?: { value: string; label: string };
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  placeholder = 'Выберите вариант',
  options,
  className,
}) => {
  const ref = React.useRef<HTMLSelectElement>(null);
  React.useEffect(() => {
    const addOpenedClass = () => ref.current?.classList.add(classes.selectOpened);
    const removeOpenedClass = () => ref.current?.classList.remove(classes.selectOpened);
    ref.current?.addEventListener('focus', addOpenedClass);
    ref.current?.addEventListener('blur', removeOpenedClass);
    return () => {
      ref.current?.removeEventListener('focus', addOpenedClass);
      ref.current?.removeEventListener('blur', removeOpenedClass);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  const selectClassName = cn(classes.select, className);

  return (
    <select
      ref={ref}
      value={value?.label}
      onChange={handleChange}
      className={selectClassName}
    >
      <option value=''>{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
