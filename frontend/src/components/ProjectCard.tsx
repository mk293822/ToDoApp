import type { Project } from '@/types/main';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import type { Priority, ProjectStatus } from '@/types/enum';

// Badge helpers
const statusColor = (status: ProjectStatus) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'in_progress':
            return 'bg-yellow-100 text-yellow-800';
        case 'pending':
            return 'bg-red-100 text-red-800';
        case 'archived':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};
const priorityColor = (priority: Priority) => {
    switch (priority) {
        case 'high':
            return 'bg-red-100 text-red-800';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'low':
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
            <CardContent className="flex gap-2 flex-col">
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
                    Type: <strong className="capitalize">{project.type}</strong>
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
