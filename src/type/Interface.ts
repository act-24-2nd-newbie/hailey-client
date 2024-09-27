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
}

export interface Task {
  id: number; // 또는 number
  title: string;
  // 필요에 따라 다른 프로퍼티 추가
}
