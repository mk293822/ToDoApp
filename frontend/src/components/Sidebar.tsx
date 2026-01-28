import { Button } from './ui/button';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">ToDoApp</h1>
      <nav className="flex flex-col space-y-3">
        <Button variant="ghost" className="justify-start">
          Dashboard
        </Button>
        <Button variant="ghost" className="justify-start">
          Projects
        </Button>
        <Button variant="ghost" className="justify-start">
          Teams
        </Button>
        <Button variant="ghost" className="justify-start">
          Tasks
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;
