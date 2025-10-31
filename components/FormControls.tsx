
import React, { ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, icon, children }) => (
  <section className="mb-10">
    <div className="flex items-center mb-6">
      {icon}
      <h2 className="text-2xl font-poppins font-bold text-cyan-400 ml-3">{title}</h2>
    </div>
    <div className="space-y-6">{children}</div>
  </section>
);

interface InputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition duration-150 ease-in-out text-gray-200 placeholder:text-gray-500"
      />
    ) : (
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition duration-150 ease-in-out text-gray-200 placeholder:text-gray-500"
      />
    )}
  </div>
);

interface CheckboxGroupProps {
    label: string;
    name: string;
    options: string[];
    selectedOptions: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, name, options, selectedOptions, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
                <label key={option} className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                        type="checkbox"
                        name={name}
                        value={option}
                        checked={selectedOptions.includes(option)}
                        onChange={onChange}
                        className="h-5 w-5 rounded border-gray-600 bg-gray-900 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                    />
                    <span className="ml-3 text-sm text-gray-200">{option}</span>
                </label>
            ))}
        </div>
    </div>
);

interface RadioGroupProps {
    label: string;
    name: string;
    options: string[];
    selectedValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, selectedValue, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="space-y-3">
            {options.map((option) => (
                <label key={option} className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <input
                        type="radio"
                        name={name}
                        value={option}
                        checked={selectedValue === option}
                        onChange={onChange}
                        className="h-5 w-5 border-gray-600 bg-gray-900 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                    />
                    <span className="ml-3 text-sm text-gray-200">{option}</span>
                </label>
            ))}
        </div>
    </div>
);