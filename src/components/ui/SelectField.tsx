// src/components/ui/SelectField.tsx
import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  icon?: React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({
    label,
    error,
    options,
    icon,
    className,
    labelClassName,
    containerClassName,
    required,
    onChange,
    ...props
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className={`w-full space-y-1 ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-[#D40000] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <select
            ref={ref}
            className={`
              appearance-none w-full px-4 py-2 border rounded-md text-gray-800 bg-white
              focus:outline-none focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]
              disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-gray-300'}
              ${className}
            `}
            onChange={handleChange}
            {...props}
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';

export default SelectField;