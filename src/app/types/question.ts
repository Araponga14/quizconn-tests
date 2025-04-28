import { Option } from "./option";

export interface Question {
  id: string;
  statement: string;
  options: Option[];
}
