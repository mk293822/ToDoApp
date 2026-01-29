import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { Project, Team } from '@/types/main';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import api from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import ProjectItem from '@/components/ProjectCard';
import Loading from '@/components/Loading';
import TeamCard from '@/components/TeamCard';
import { EVENT_NAMES } from '@/lib/event-names';
import { eventBus } from '@/lib/event-bus';

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/dashboard'); // Make sure your route returns projects & teams
                setProjects(res.data.projects); // paginated projects
                setTeams(res.data.teams);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    const handleAddProject = () => {
        eventBus.emit(EVENT_NAMES.SUCCESS_NOTIFICATION, {
            message: 'Project Addition',
            description: 'Project added successfully',
        });
    };

    return (
        <AuthenticatedLayout title="Dashboard">
            <div className="flex h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold">Dashboard</h2>
                        <Button onClick={handleAddProject}>
                            <Plus className="w-4 h-4 mr-2" /> Add Project
                        </Button>
                    </div>

                    {/* Projects Section */}
                    <section className="mb-8">
                        <h3 className="text-xl font-semibold mb-4">Projects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <ProjectItem
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Teams Section */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4">Teams</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teams.map((team) => (
                                <TeamCard key={team.id} team={team} />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
