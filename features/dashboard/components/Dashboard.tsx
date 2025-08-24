import { Button } from "../../../src/components/ui/button";
import { useSignOut } from "../../auth/api/use-sign-out";

const Dashboard = () => {
  const signOut = useSignOut();

  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        Welcome to Dashboard
      </h1>
      <p className="text-gray-600 mb-2">You are logged in.</p>
      <div className="mt-6 p-6 rounded-xl bg-white shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Quick Info</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>This is a simple dashboard page.</li>
        </ul>
      </div>
      <Button
        className="mt-8 bg-red-500 hover:bg-red-600 text-white"
        onClick={signOut}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Dashboard;