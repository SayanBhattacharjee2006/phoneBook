import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Card from "../../components/Card";
import useContactStore from "../../store/contact.store";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedContact = useContactStore((state) => state.selectedContact);
  const getContact = useContactStore((state) => state.getContact);
  const updateContact = useContactStore((state) => state.updateContact);
  const loading = useContactStore((state) => state.loading);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
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

    if (!formData.firstName.trim()) {
      return;
    }

    try {
      await updateContact(id, {
        contact: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company,
        },
      });

      navigate(`/contacts/${id}`);
    } catch (error) {
      console.error("Update contact failed", error);
    }
  };

  if (loading && !selectedContact) {
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
          </div>

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
