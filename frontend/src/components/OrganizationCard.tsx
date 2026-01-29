import type { Organization } from '@/types/main';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';

// Badge helpers for counts
const countBadge = (count: number) => {
    let color = 'bg-green-100 text-green-800';
    if (count === 0) color = 'bg-gray-100 text-gray-800';
    if (count <= 5) color = 'bg-yellow-100 text-yellow-800';
    if (count <= 20) color = 'bg-blue-100 text-blue-800';
    return `inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 ${color}`;
};
interface OrganizationCardProps {
    organization: Organization;
}

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
    return (
        <Card className="hover:shadow-xl transition-transform hover:scale-[102%]">
            <CardHeader>
                <CardTitle>{organization.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {organization.description && (
                    <p className="text-gray-600 text-sm">
                        {organization.description}
                    </p>
                )}
                <div className="flex gap-2 text-sm">
                    <span className={countBadge(organization.members_count)}>
                        Members: {organization.members_count}
                    </span>
                    <span className={countBadge(organization.projects_count)}>
                        Projects: {organization.projects_count}
                    </span>
                    <span className={countBadge(organization.teams_count)}>
                        Teams: {organization.teams_count}
                    </span>
                </div>
                {organization.owner && (
                    <p className="text-gray-500 text-sm mt-1">
                        Owner: <strong>{organization.owner.name}</strong>
                    </p>
                )}
            </CardContent>
            <CardFooter>
                <CardDescription>
                    Manage your organization effectively
                </CardDescription>
            </CardFooter>
        </Card>
    );
};

export default OrganizationCard;
