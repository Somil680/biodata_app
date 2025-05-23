// src/components/ui/InputField.tsx
import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
  containerClassName?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ 
    label, 
    error, 
    className, 
    labelClassName, 
    containerClassName, 
    required, 
    icon,
    ...props 
  }, ref) => {
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
          <input
            ref={ref}
            className={`
              w-full px-4 py-2 border rounded-md text-gray-800
              placeholder:text-gray-400 focus:outline-none
              focus:ring-2 focus:ring-[#D40000]/30 focus:border-[#D40000]
              disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-gray-300'}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;