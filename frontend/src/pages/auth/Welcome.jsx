import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-2xl font-semibold">📇</span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Welcome to Contact Book
          </h1>
          <p className="text-sm text-gray-500">
            Manage all your contacts in one secure and simple place.
          </p>
        </div>

        {/* Action */}
        <Button onClick={() => navigate("/contacts")}>
          <span className="w-full inline-block text-center">
            View Contacts
          </span>
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
