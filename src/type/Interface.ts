export interface TopbarProps {
  title?: string;
}

export interface TaskFieldProps {
  id: number;
  contents: string;
  isDone: boolean;
  createdDate: string;
  modifiedDate: string;
}

export interface TextFieldProps {
  borderVisible?: boolean;
  placeholder?: string;
  inputValue?: string;
  onSend?: (value: string) => void;
  style?: React.CSSProperties;
  focus?: boolean;
  type?: string;
  field?: string;
}

export interface ListProps {
  title: string;
  data: string[];
  onSelect: (value: string) => void;
}

export interface ButtonProps {
  title: string;
}

export interface Task {
  id: number;
  contents: string;
  isDone: boolean;
  modifiedDate: string;
  createdDate: string;
}
