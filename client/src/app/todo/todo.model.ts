export interface TodoModel {
  _id?: string;

  dueDate: Date;
  title: string;
  description: string;
  isCompleted: boolean;
}
