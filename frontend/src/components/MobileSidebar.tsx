import { useState } from 'react';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';
import { ROUTES } from '@/routes';

const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    const headers = [
        { title: 'Dahsboard', href: ROUTES.DASHBOARD },
        { title: 'Projects', href: ROUTES.PROJECTS },
    ];

    return (
        <Drawer modal open={open} onOpenChange={setOpen} direction="left">
            <DrawerTrigger asChild>
                <Button variant="outline" aria-label="Open Menu">
                    <svg
                        className="w-8 h-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </Button>
            </DrawerTrigger>

            <DrawerContent className="bg-white p-6 w-64 sm:w-72">
                <DrawerHeader>
                    <DrawerTitle className="text-2xl">Menu</DrawerTitle>
                    <DrawerDescription>
                        Navigate through the sections
                    </DrawerDescription>
                </DrawerHeader>

                <nav className="flex flex-col mt-4 gap-3">
                    {headers.map((header, index) => (
                        <a
                            key={index}
                            href={header.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-800 font-medium hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-lg"
                        >
                            <span>{header.title}</span>
                            <svg
                                className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </a>
                    ))}
                </nav>
            </DrawerContent>
        </Drawer>
    );
};

export default MobileSidebar;
