export type TTodoInput = {
  taskName: string;
  description: string;
  priority: number;
  tags?: string[];
};
export type TTodoUpdateInput = {
  taskName: string;
  description: string;
  priority: number;
  tags?: string[];
  isDone: boolean;
};
export type TTodo = {
  taskName: string;
  description: string;
  priority: number;
  tags?: string[];
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
};
