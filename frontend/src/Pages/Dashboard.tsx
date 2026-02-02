import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { User } from '@/types/main';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import api from '@/lib/api';
import { EVENT_NAMES } from '@/event-names';
import { eventBus } from '@/lib/event-bus';
import MobileSidebar from '@/components/MobileSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAbortableEffect } from '@/hooks/use-abortable-effect';
import axios from 'axios';
import Loading from '@/components/Loading';
import { useState } from 'react';

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useAbortableEffect((signal) => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get('/dashboard', { signal });
                setUser(res.data.user);
            } catch (err) {
                if (axios.isCancel(err)) return;
                if (err instanceof axios.AxiosError) {
                    eventBus.emit(EVENT_NAMES.ERROR_NOTIFICATION, {
                        message:
                            err.response?.data?.message ||
                            'Fetching Dashboard data failed!',
                        description:
                            'There was a problem fetching the dashboard data!',
                    });
                } else {
                    eventBus.emit(EVENT_NAMES.ERROR_NOTIFICATION, {
                        message: 'Fetch Dashboard data failed!',
                        description:
                            'There was a problem fetching the dashboard data!',
                    });
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddProject = () => {
        eventBus.emit(EVENT_NAMES.SUCCESS_NOTIFICATION, {
            message: 'Project Addition',
            description: 'Project added successfully',
        });
    };

    if (loading) return <Loading />;

    return (
        <AuthenticatedLayout title="Dashboard">
            {/* Main Content */}
            <nav className="flex px-6 py-5 justify-between items-center border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold flex-1">Dashboard</h2>
                <div className="flex gap-4 flex-row justify-between items-center">
                    <Button onClick={handleAddProject}>
                        <Plus className="w-4 h-4 mr-2" /> Add Project
                    </Button>
                    <div className="sm:hidden">
                        <MobileSidebar />
                    </div>
                </div>
            </nav>

            <div className="grid grid-cols-4 p-4">
                <Card className="hover:shadow-xl transition-transform hover:scale-[102%]">
                    <CardHeader>
                        <CardTitle>{user?.name}</CardTitle>
                        <CardTitle>{user?.email}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-2 flex-col">
                        hello
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
