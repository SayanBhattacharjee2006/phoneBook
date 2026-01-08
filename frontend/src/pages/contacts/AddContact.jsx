import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import useContactStore from "../../store/contact.store";

function AddContact() {
    const navigate = useNavigate();
    const { loading, createContact } = useContactStore();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.firstName.trim()) return;
        try {
            await createContact({
                contact: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    company: formData.company,
                    notes: formData.notes,
                },
            });

            navigate("/contacts");
        } catch (error) {
            console.error("Create contact failed", error);
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
                        <h1 className="text-xl font-semibold">Add Contact</h1>
                        <p className="text-sm text-gray-500">
                            Create a new contact in your address book
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            required
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                        />
                        <Input
                            label="Company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Inc."
                        />
                        <div className="space-y-1">
                            <label className="text-sm text-gray-600">
                                Notes
                            </label>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={4}
                                className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                                placeholder="Additional notes about this contact"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Contact"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default AddContact;
