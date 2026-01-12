import useContactStore from "../../store/contact.store";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmModal from "../../components/confirmModal";
import toast from "react-hot-toast";
import Skeleton from "../../components/skeleton";

function ContactDetails() {
    const navigate = useNavigate();
    const { id: contactId } = useParams();
    const {
        selectedContact,
        loading,
        getContact,
        deleteContact,
        updatePhone,
        addPhone,
        addEmail,
        updateEmail,
        addAddress,
        updateAddress,
    } = useContactStore();

    const [phoneForm, setPhoneForm] = useState({
        phoneNumber: "",
        phoneType: "personal",
        isPrimary: false,
    });

    const [emailForm, setEmailForm] = useState({
        email: "",
        emailType: "personal",
    });

    const [addressForm, setAddressForm] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        landmark: "",
    });

    const [editingPhoneId, setEditingPhoneId] = useState(null);
    const [editingEmailId, setEditingEmailId] = useState(null);
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [addressError, setAddressError] = useState("");

    useEffect(() => {
        if (contactId) {
            getContact(contactId);
        }
    }, [contactId, getContact]);

    useEffect(() => {
        setEditingPhoneId(null);
        setEditingEmailId(null);
        setEditingAddressId(null);

        setPhoneForm({
            phoneNumber: "",
            phoneType: "personal",
            isPrimary: false,
        });

        setEmailForm({
            email: "",
            emailType: "personal",
        });

        setAddressForm({
            street: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            landmark: "",
        });
    }, [selectedContact?._id]);

    const handleConfirmDelete = async (e) => {
        try {
            await deleteContact(selectedContact._id);
            toast.success("Contact deleted successfully");
            navigate("/contacts");
        } catch (error) {
            toast.error("Failed to delete contact");
            console.error("Delete Contact failed", error);
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handlePhoneChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPhoneForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        if (!selectedContact?._id) return;
        if (!emailForm.email.trim()) return;

        try {
            if (editingEmailId) {
                await updateEmail(
                    selectedContact._id,
                    editingEmailId,
                    emailForm
                );
            } else {
                await addEmail(selectedContact._id, emailForm);
            }
            toast.success("email saved successfully");
            setEmailForm({
                email: "",
                emailType: "personal",
            });
            setEditingEmailId(null);
        } catch (error) {
            setPhoneError("Failed to save email");
            toast.error("Failed to save email");
            console.error("Email save failed", error);
        }
    };

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setPhoneError("");
        if (!phoneForm.phoneNumber.trim()) return;

        try {
            if (editingPhoneId) {
                await updatePhone(
                    selectedContact._id,
                    editingPhoneId,
                    phoneForm
                );
                setEditingPhoneId(null);
            } else {
                await addPhone(selectedContact._id, phoneForm);
            }
            toast.success("phone saved successfully")
            setPhoneForm({
                phoneNumber: "",
                phoneType: "personal",
                isPrimary: false,
            });
        } catch (error) {
            setPhoneError("Failed to save phone number")
            toast.error("Failed to save phone number")
            console.error("Phone operation failed", error);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        setAddressError("");

        if (!selectedContact?._id) return;
        if (!addressForm.street.trim()) return;

        try {
            if (editingAddressId) {
                await updateAddress(
                    selectedContact._id,
                    editingAddressId,
                    addressForm
                );
            } else {
                await addAddress(selectedContact._id, addressForm);
            }

            setAddressForm({
                street: "",
                city: "",
                state: "",
                country: "",
                postalCode: "",
                landmark: "",
            });
            toast.success("Address saved successfully")
            setEditingAddressId(null);
        } catch (error) {
            setAddressError("failed to save address")
            toast.error("failed to save address")
            console.error("Address save failed", error);
        }
    };

    if (loading || !selectedContact) return <ContactDetailsSkeleton />;

    return (
        // <div className="p-6 space-y-6">
        //     {/* Header */}
        //     <div className="flex items-center justify-between">
        //         <div>
        //             <h1 className="text-2xl font-semibold">
        //                 {selectedContact.firstName} {selectedContact.lastName}
        //             </h1>
        //             {selectedContact.company && (
        //                 <p className="text-sm text-gray-500">
        //                     {selectedContact.company}
        //                 </p>
        //             )}
        //         </div>
        //         <div className="flex items-center gap-4">
        //             <Link
        //                 to={`/contacts/${selectedContact._id}/edit`}
        //                 className="text-sm text-primary hover:underline"
        //             >
        //                 Edit
        //             </Link>

        //             <button
        //                 onClick={handleDelete}
        //                 className="text-sm text-red-600 hover:underline"
        //             >
        //                 Delete
        //             </button>
        //         </div>
        //     </div>

        //     {/* Basic Info */}
        //     <div className="border rounded-lg p-4 space-y-2">
        //         <div>
        //             <span className="text-sm text-gray-500">Favourite:</span>{" "}
        //             <span className="text-sm">
        //                 {selectedContact.isFavourite ? "Yes" : "No"}
        //             </span>
        //         </div>

        //         <div>
        //             <span className="text-sm text-gray-500">Created:</span>{" "}
        //             <span className="text-sm">
        //                 {new Date(
        //                     selectedContact.createdAt
        //                 ).toLocaleDateString()}
        //             </span>
        //         </div>
        //     </div>

        //     {selectedContact.birthday && (
        //         <div className="border rounded-lg p-4 space-y-1">
        //             <h3 className="text-sm font-medium">Birthday</h3>
        //             <p className="text-sm text-gray-600">
        //                 {new Date(selectedContact.birthday).toLocaleDateString()}
        //             </p>
        //         </div>
        //     )}

        //     {selectedContact.notes && (
        //         <div className="border rounded-lg p-4 space-y-1">
        //             <h3 className="text-sm font-medium">Notes</h3>
        //             <p className="text-sm text-gray-600 whitespace-pre-line">
        //                 {selectedContact.notes}
        //             </p>
        //         </div>
        //     )}

        //     {/* Placeholders for future phases */}
        //     <div className="space-y-2">
        //         <p className="text-sm text-gray-500">
        //             Phone numbers, emails, and addresses will appear here.
        //         </p>
        //     </div>
        // </div>
        <div className="p-6 space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        {selectedContact.firstName} {selectedContact.lastName}
                    </h1>
                    {selectedContact.company && (
                        <p className="text-sm text-gray-500">
                            {selectedContact.company}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to={`/contacts/${selectedContact._id}/edit`}
                        className="text-sm text-primary hover:underline"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="text-sm text-red-600 hover:underline"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-500">Favourite</p>
                    <p className="text-sm">
                        {selectedContact.isFavourite ? "Yes" : "No"}
                    </p>
                </div>

                <div className="border rounded-lg p-4">
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="text-sm">
                        {new Date(
                            selectedContact.createdAt
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Birthday */}
            {selectedContact.birthday && (
                <div className="border rounded-lg p-4 space-y-1">
                    <h3 className="text-sm font-medium">Birthday</h3>
                    <p className="text-sm text-gray-600">
                        {new Date(
                            selectedContact.birthday
                        ).toLocaleDateString()}
                    </p>
                </div>
            )}

            {/* Notes */}
            {selectedContact.notes && (
                <div className="border rounded-lg p-4 space-y-1">
                    <h3 className="text-sm font-medium">Notes</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                        {selectedContact.notes}
                    </p>
                </div>
            )}

            {/* Phones */}
            <div className="border rounded-lg p-4 space-y-4">
                <h3 className="text-sm font-medium">Phone Numbers</h3>

                {/* Existing Phones */}
                {selectedContact.phones?.length > 0 ? (
                    <ul className="space-y-2">
                        {selectedContact.phones.map((phone) => (
                            <li
                                key={phone._id}
                                className="flex items-center justify-between text-sm"
                            >
                                <div>
                                    <span className="font-medium">
                                        {phone.phoneNumber}
                                    </span>
                                    <span className="ml-2 text-gray-500">
                                        ({phone.phoneType})
                                    </span>
                                    {phone.isPrimary && (
                                        <span className="ml-2 text-xs text-primary">
                                            Primary
                                        </span>
                                    )}
                                </div>

                                <button
                                    onClick={() => {
                                        setEditingPhoneId(phone._id);
                                        setPhoneForm({
                                            phoneNumber: phone.phoneNumber,
                                            phoneType: phone.phoneType,
                                            isPrimary: phone.isPrimary,
                                        });
                                    }}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">
                        No phone numbers added.
                    </p>
                )}

                {/* Add / Edit Form */}
                <form onSubmit={handlePhoneSubmit} className="space-y-2">
                    <input
                        type="text"
                        name="phoneNumber"
                        value={phoneForm.phoneNumber}
                        onChange={handlePhoneChange}
                        placeholder="Phone number"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />

                    <div className="flex items-center gap-2">
                        <select
                            name="phoneType"
                            value={phoneForm.phoneType}
                            onChange={handlePhoneChange}
                            className="border rounded-md px-2 py-1 text-sm"
                        >
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="other">Other</option>
                        </select>

                        <label className="flex items-center gap-1 text-sm">
                            <input
                                type="checkbox"
                                name="isPrimary"
                                checked={phoneForm.isPrimary}
                                onChange={handlePhoneChange}
                            />
                            Primary
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!phoneForm.phoneNumber.trim()}
                        className="text-sm text-primary hover:underline"
                    >
                        {editingPhoneId ? "Update Phone" : "Add Phone"}
                    </button>
                </form>
            </div>
            {phoneError && <p className="text-xs text-red-600">{phoneError}</p>}

            {/* Emails */}
            <div className="border rounded-lg p-4 space-y-4">
                <h3 className="text-sm font-medium">Emails</h3>

                {/* Existing Emails */}
                {selectedContact.emails?.length > 0 ? (
                    <ul className="space-y-2">
                        {selectedContact.emails.map((email) => (
                            <li
                                key={email._id}
                                className="flex items-center justify-between text-sm"
                            >
                                <div>
                                    <span className="font-medium">
                                        {email.email}
                                    </span>
                                    <span className="ml-2 text-gray-500">
                                        ({email.emailType})
                                    </span>
                                </div>

                                <button
                                    onClick={() => {
                                        setEditingEmailId(email._id);
                                        setEmailForm({
                                            email: email.email,
                                            emailType: email.emailType,
                                        });
                                    }}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No emails added.</p>
                )}

                {/* Add / Edit Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-2">
                    <input
                        type="email"
                        name="email"
                        value={emailForm.email}
                        onChange={handleEmailChange}
                        placeholder="Email address"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />

                    <select
                        name="emailType"
                        value={emailForm.emailType}
                        onChange={handleEmailChange}
                        className="border rounded-md px-2 py-1 text-sm"
                    >
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                    </select>

                    <button
                        type="submit"
                        className="text-sm text-primary hover:underline"
                        disabled={!emailForm.email.trim()}
                    >
                        {editingEmailId ? "Update Email" : "Add Email"}
                    </button>
                </form>
            </div>
            {emailError && <p className="text-xs text-red-600">{emailError}</p>}
            {/* Addresses */}
            <div className="border rounded-lg p-4 space-y-4">
                <h3 className="text-sm font-medium">Addresses</h3>

                {/* Existing Addresses */}
                {selectedContact.addresses?.length > 0 ? (
                    <ul className="space-y-3">
                        {selectedContact.addresses.map((address) => (
                            <li
                                key={address._id}
                                className="flex items-start justify-between text-sm"
                            >
                                <div className="space-y-1">
                                    <p className="font-medium">
                                        {address.street}
                                    </p>
                                    <p className="text-gray-600">
                                        {address.city}, {address.state}
                                    </p>
                                    <p className="text-gray-600">
                                        {address.country} {address.postalCode}
                                    </p>
                                    {address.landmark && (
                                        <p className="text-gray-500">
                                            Landmark: {address.landmark}
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => {
                                        setEditingAddressId(address._id);
                                        setAddressForm({
                                            street: address.street || "",
                                            city: address.city || "",
                                            state: address.state || "",
                                            country: address.country || "",
                                            postalCode:
                                                address.postalCode || "",
                                            landmark: address.landmark || "",
                                        });
                                    }}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">No addresses added.</p>
                )}

                {/* Add / Edit Form */}
                <form onSubmit={handleAddressSubmit} className="space-y-2">
                    <input
                        type="text"
                        name="street"
                        value={addressForm.street}
                        onChange={handleAddressChange}
                        placeholder="Street"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressChange}
                            placeholder="City"
                            className="border rounded-md px-3 py-2 text-sm"
                        />

                        <input
                            type="text"
                            name="state"
                            value={addressForm.state}
                            onChange={handleAddressChange}
                            placeholder="State"
                            className="border rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            name="country"
                            value={addressForm.country}
                            onChange={handleAddressChange}
                            placeholder="Country"
                            className="border rounded-md px-3 py-2 text-sm"
                        />

                        <input
                            type="text"
                            name="postalCode"
                            value={addressForm.postalCode}
                            onChange={handleAddressChange}
                            placeholder="Postal Code"
                            className="border rounded-md px-3 py-2 text-sm"
                        />
                    </div>

                    <input
                        type="text"
                        name="landmark"
                        value={addressForm.landmark}
                        onChange={handleAddressChange}
                        placeholder="Landmark (optional)"
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />

                    <button
                        type="submit"
                        className="text-sm text-primary hover:underline"
                        disabled={!addressForm.street.trim()}
                    >
                        {editingAddressId ? "Update Address" : "Add Address"}
                    </button>
                </form>
            </div>
            {addressError && (
                <p className="text-xs text-red-600">{addressError}</p>
            )}
            <ConfirmModal
                open={showDeleteModal}
                title="Delete Contact"
                message="Are you sure you want to delete this contact? This action cannot be undone."
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </div>
    );
}

function ContactDetailsSkeleton() {
    return (
        <div className="p-6 space-y-6">
            <Skeleton height={2} width="50%" />
            <Skeleton height={1.5} width="30%" />

            <div className="grid grid-cols-2 gap-4">
                <Skeleton height={4} />
                <Skeleton height={4} />
            </div>

            <Skeleton height={6} />
        </div>
    );
}

export default ContactDetails;
