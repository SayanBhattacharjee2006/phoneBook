import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import useContactStore from "../../store/contact.store";
import toast from "react-hot-toast";

function EditContact() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedContact, getContact, updateContact, loading } =
        useContactStore();
    const [error, setError] = useState();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        notes: "",
        birthday: "",
    });

    useEffect(() => {
        if (!selectedContact || selectedContact._id !== id) {
            getContact(id);
        }
    }, [id, selectedContact, getContact]);

    useEffect(() => {
        if (selectedContact) {
            setFormData({
                firstName: selectedContact.firstName || "",
                lastName: selectedContact.lastName || "",
                company: selectedContact.company || "",
                notes: selectedContact.notes || "",
                birthday: selectedContact.birthday
                    ? selectedContact.birthday.split("T")[0]
                    : "",
            });
        }
    }, [selectedContact]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!formData.firstName.trim()) {
            setError("first name is required");
            return;
        }

        try {
            const contactPayload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                company: formData.company,
                notes: formData.notes,
            };

            if (formData.birthday) {
                contactPayload.birthday = formData.birthday;
            }

            await updateContact(id, {
                contact: contactPayload,
            });
            toast.success("contact updated successfully");
            navigate(`/contacts/${id}`);
        } catch (error) {
            setError("Failed to update contactt.try again");
            toast.error("failed to update contact");
            console.error("Update contact failed", error);
        }
    };

    if (!selectedContact) {
        return <div className="p-6">Loading contact...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Card>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-sm"
                >
                    {/* Header */}
                    <div className="space-y-1">
                        <h1 className="text-xl font-semibold">Edit Contact</h1>
                        <p className="text-sm text-gray-500">
                            Update contact details
                        </p>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <Input
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                        <Input
                            label="Company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                        <div className="space-y-1">
                            <label className="text-sm text-gray-600">
                                Birthday
                            </label>
                            <input
                                type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange}
                                max={new Date().toISOString().split("T")[0]}
                                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

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

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    {/* Actions */}
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default EditContact;
