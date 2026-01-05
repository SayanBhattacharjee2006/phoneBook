import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card>
                <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">Welcome Back</h1>
                        <p className="text-sm text-gray-500">
                            Sign in to your Contact Book
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Action */}
                    <Button onClick={()=>navigate("/welcome")}>
                        <span className="w-full inline-block text-center py-2">
                            Login
                        </span>
                    </Button>

                    {/* Footer */}
                    <p className="text-sm text-center text-gray-500">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-primary font-medium"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default Login;
