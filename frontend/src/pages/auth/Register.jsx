import React from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card>
                <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-sm">
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
                            placeholder="Enter your full name"
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                        />
                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-grey-500">
                                use at least 8 characters
                            </p>
                        </div>
                    </div>

                    <Button onClick={()=>navigate("/welcome")}>
                        <span className="w-full inline-block text-center py-2">
                            Create Account
                        </span>
                    </Button>

                    <p className="text-sm text-center text-gray-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
}

export default Register;
