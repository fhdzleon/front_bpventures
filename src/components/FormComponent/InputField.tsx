// InputField.tsx
import React from 'react';

interface InputFieldProps {
  label?: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
};

export default InputField;
