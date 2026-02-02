import type { Priority, ProjectStatus } from './enum';

export type User = {
    id: number;
    name: string;
    email: string;
};

export type Organization = {
    id: number;
    name: string;
    description: string;
    members_count: number;
    projects_count: number;
    teams_count: number;
    owner?: User;
    visibility: string;
    members?: User[];
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
    status: ProjectStatus;
    tasks_count: number;
    priority: Priority;
    start_date?: string;
    due_date?: string;
    tasks?: Task[];
    owner?: User;
    type: string;
};
export type Team = {
    id: number;
    name: string;
    members_count: number;
    visibility: string;
    owner?: User;
};
