export type User = {
  id: number;
  name: string;
  email: string;
};

export type Task = {
  id: number;
  title: string;
  status: string;
  priority: string;
  assigned_to?: User;
  due_date?: string;
};
export type Project = {
  id: number;
  name: string;
  description: string;
  status: string;
  tasks_count: number;
  priority: string;
  start_date?: string;
  due_date?: string;
  tasks?: Task[];
  owner?: User;
};
export type Team = {
  id: number;
  name: string;
  members_count: number;
  visibility: string;
  owner?: User;
};
