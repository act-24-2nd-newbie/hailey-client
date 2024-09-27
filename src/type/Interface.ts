export interface TopbarProps {
  title?: string;
}

export interface TextFieldProps {
  borderVisible?: boolean; // Optional prop to control border visibility
  placeholder: string;
  onSend: (value: string) => void;
}

export interface ListProps {
  title: string;
  data: string[];
}

export interface ButtonProps {
  title: string;
  data: string;
}
