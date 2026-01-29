import type { Project } from '@/types/main';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';

// Badge helpers
const statusColor = (status: string) => {
    switch (status) {
        case 'Completed':
            return 'bg-green-100 text-green-800';
        case 'In Progress':
            return 'bg-yellow-100 text-yellow-800';
        case 'Pending':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
const priorityColor = (priority: string) => {
    switch (priority) {
        case 'High':
            return 'bg-red-100 text-red-800';
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'Low':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const ProjectItem = ({ project }: { project: Project }) => {
    return (
        <Card className="hover:shadow-xl transition-transform hover:scale-[102%]">
            <CardHeader>
                <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>
                    Status:{' '}
                    <span
                        className={`px-2 py-1 rounded-full text-sm ${statusColor(project.status)}`}
                    >
                        {project.status}
                    </span>
                </p>
                <p>
                    Priority:{' '}
                    <span
                        className={`px-2 py-1 rounded-full text-sm ${priorityColor(project.priority)}`}
                    >
                        {project.priority}
                    </span>
                </p>
                <p>
                    Tasks: <strong>{project.tasks_count}</strong>
                </p>
                <p>
                    Start: {project.start_date} | Due: {project.due_date}
                </p>
                {project.owner && (
                    <p>
                        Owner: <strong>{project.owner.name}</strong>
                    </p>
                )}
            </CardContent>
            <CardFooter>
                <CardDescription>{project.description}</CardDescription>
            </CardFooter>
        </Card>
    );
};

export default ProjectItem;
