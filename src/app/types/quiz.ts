import { Question } from "./question"

export interface Quiz {
    id: string,
    title: string,
    completed: boolean,
    dueDate: Date
    questions: Question[]
}