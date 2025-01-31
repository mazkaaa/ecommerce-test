import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

interface PROPS {
  placeholder?: string;
  options?: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}
export const SelectWrapper = (props: PROPS) => {
  return (
    <Select onValueChange={props.onChange} value={props.value}>
      <SelectTrigger className={props.className}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
