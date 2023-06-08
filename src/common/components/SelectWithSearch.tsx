import Select from 'react-select';

interface SelectWithSearchProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  handleChange: (selectedValue: string | undefined) => void;
  className: string;
}

export default function SelectWithSearch({
  options,
  placeholder,
  handleChange,
  className,
}: SelectWithSearchProps) {
  return (
    <Select
      isClearable={true}
      isSearchable={true}
      placeholder={placeholder}
      options={options}
      autoFocus
      backspaceRemovesValue
      onChange={(selected) => handleChange(selected?.value)}
      className={className}
    />
  );
}
