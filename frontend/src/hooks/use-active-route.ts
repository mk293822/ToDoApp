import { useLocation } from 'react-router-dom';

export const useActiveRoute = () => {
    const { pathname } = useLocation();

    const isActive = (href: string, exact = false) =>
        exact ? pathname === href : pathname.startsWith(href);

    return { isActive };
};
