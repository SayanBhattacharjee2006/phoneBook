import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth.store";
import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
    const navigate = useNavigate();
    const { login, loading } = useAuthStore();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            navigate("/welcome");
        } catch (error) {
            console.log("Login Failed", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-sm"
                >
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Action */}
                    <Button
                        type="submit"
                        disabled={loading}
                    >
                        <span className="w-full inline-block text-center py-2">
                            {loading ? "Logging in ..." : "Login"}
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
                </form>
            </Card>
        </div>
    );
}

export default Login;
