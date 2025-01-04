'use client'
import ReactInputMask from 'react-input-mask';

interface InputMaskProps {
  mask: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name: string;
  required?: boolean;
}

const InputMask = ({ mask, value, onChange, placeholder, className, ...props }: InputMaskProps) => {
  return (
    <ReactInputMask
      mask={mask}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 ${className}`}
      {...props}
    />
  );
};

export default InputMask;