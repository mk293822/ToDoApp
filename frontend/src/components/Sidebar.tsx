import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'; // ShadCN Tooltip component
import { Squares2X2Icon, FolderIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';
import { useActiveRoute } from '@/hooks/use-active-route';

const headers = [
    {
        title: 'Dashboard',
        href: ROUTES.DASHBOARD,
        icon: <Squares2X2Icon className="w-5 h-5" />,
        exact: true,
    },
    {
        title: 'Projects',
        href: ROUTES.PROJECTS,
        icon: <FolderIcon className="w-5 h-5" />,
    },
];

const Sidebar = () => {
    const { isActive } = useActiveRoute();

    return (
        <div className="px-3 hidden sm:flex py-4 space-y-4 bg-gray-900 h-screen flex-col items-center border-r border-gray-200">
            {/* Logo */}
            <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span className="w-1.5 h-1.5 bg-white/80 rounded-full" />
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
            </div>

            <div className="pb-2">
                <svg
                    width="40"
                    height="34"
                    viewBox="0 0 56 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2.5 2.50132C39.9412 2.21597 39.9655 48.1813 2.5 48.4654"
                        stroke="#D9D9D9"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M30.1875 3C42.7863 3.00008 53 13.2136 53 25.8125C52.9999 38.4113 42.7863 48.6249 30.1875 48.625C17.5886 48.625 7.37507 38.4113 7.37498 25.8125C7.37498 13.2136 17.5886 3 30.1875 3Z"
                        stroke="#D9D9D9"
                        strokeWidth="5"
                    />
                    <line
                        x1="36.1248"
                        y1="3"
                        x2="4.00001"
                        y2="3"
                        stroke="#D9D9D9"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                    <line
                        x1="20.8749"
                        y1="3"
                        x2="20.8749"
                        y2="48"
                        stroke="#D9D9D9"
                        strokeWidth="5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            {headers.map(({ title, href, icon, exact }) => (
                <Tooltip key={title}>
                    <TooltipTrigger asChild>
                        <Link
                            to={href}
                            className={`p-2.5 flex justify-center text-gray-100 items-center transition-colors rounded-full ${isActive(href, exact) ? 'bg-gray-700' : ''}`}
                        >
                            {icon}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side={'right'}>{title}</TooltipContent>
                </Tooltip>
            ))}
        </div>
    );
};

export default Sidebar;
