import React, { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth.store";

function Register() {
    const navigate = useNavigate();
    const { register, loading } = useAuthStore();

    const [formData, setFormData] = useState({
        name: "",
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
            await register(formData);
            navigate("/welcome");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-sm"
                >
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold">
                            Create Account
                        </h1>
                        <p className="text-sm text-gray-500">
                            Start managing your contacts
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                        />
                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-grey-500">
                                use at least 8 characters
                            </p>
                        </div>
                    </div>

                    <Button type="submit" disabled={loading}>
                        <span className="w-full inline-block text-center py-2">
                            {loading? "Creating account..":"Create Account"}
                        </span>
                    </Button>

                    <p className="text-sm text-center text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-medium">
                            Login
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}

export default Register;
