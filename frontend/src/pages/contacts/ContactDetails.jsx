import useContactStore from "../../store/contact.store";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ContactDetails() {
    const navigate = useNavigate();
    const { id: contactId } = useParams();
    const { selectedContact, loading, getContact, deleteContact } =
        useContactStore();

    useEffect(() => {
        if (contactId) {
            getContact(contactId);
        }
    }, [contactId, getContact]);

    const handleDelete = async (e) => {
        try {
            await deleteContact(selectedContact._id);
            navigate("/contacts");
        } catch (error) {
            console.error("Delete Contact failed", error);
        }
    };

    if (loading || !selectedContact)
        return <div className="p-6">Loading Contact...</div>;

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
                        onClick={handleDelete}
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
                        {new Date(selectedContact.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Birthday */}
            {selectedContact.birthday && (
                <div className="border rounded-lg p-4 space-y-1">
                    <h3 className="text-sm font-medium">Birthday</h3>
                    <p className="text-sm text-gray-600">
                        {new Date(selectedContact.birthday).toLocaleDateString()}
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
        </div>
    );
}

export default ContactDetails;
