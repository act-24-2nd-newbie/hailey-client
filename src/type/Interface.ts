export interface TopbarProps {
  title?: string;
}

export interface TaskFieldProps {
  id: number;
  contents: string;
  isDone: boolean;
  createdDate: Date;
  modifiedDate: Date;
}

export interface TextFieldProps {
  borderVisible?: boolean;
  placeholder?: string;
  inputValue?: string;
  onSend?: (value: string) => void;
  style?: React.CSSProperties;
  focus?: boolean;
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
  is_done: boolean;
  modified_date: Date;
  created_date: Date;
}
