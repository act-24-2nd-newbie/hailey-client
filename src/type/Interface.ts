export interface TopbarProps {
  title?: string;
}

export interface TaskFieldProps {
  id: number;
  contents: string;
  date: Date;
}

export interface TextFieldProps {
  borderVisible?: boolean; // Optional prop to control border visibility
  placeholder: string;
  onSend: (value: string) => void;
  width: number;
  top: number;
  left: number;
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
  id: number; // 또는 number
  contents: string;
  is_done: boolean;
  modified_date: Date;
  created_date: Date;
}
