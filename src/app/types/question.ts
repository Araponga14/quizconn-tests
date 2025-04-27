export interface Question {
  id: string;
  statement: string;
  options: { option: number; text: string }[];
  correctOption: number;
}
