import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';
import type { Team } from '@/types/main';
import { Button } from './ui/button';

const TeamCard = ({ team }: { team: Team }) => {
    return (
        <Card className="hover:shadow-lg transition-transform hover:scale-[102%]">
            <CardHeader>
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>Visibility: {team.visibility}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    Members: <strong>{team.members_count}</strong>
                </p>
                {team.owner && (
                    <p>
                        Owner: <strong>{team.owner.name}</strong>
                    </p>
                )}
                <Button className="mt-2">View Team</Button>
            </CardContent>
        </Card>
    );
};

export default TeamCard;
