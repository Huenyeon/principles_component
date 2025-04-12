import { X } from "lucide-react";
import formDetails from "../types/formDetails";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Partial<formDetails>;
  setFormData: (data: Partial<formDetails>) => void;
  onSave: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
}) => {
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Edit Details</h2>
          <X
            onClick={onClose}
            className="cursor-pointer w-6 h-6 text-gray-600 hover:text-gray-800"
          />
        </div>
        <div className="mt-4 space-y-2">
          {/* <input className="w-full p-2 border rounded" type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="First Name" />
                    <input className="w-full p-2 border rounded" type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Last Name" /> */}
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="groupName"
            value={formData.groupName || ""}
            onChange={handleChange}
            placeholder="Group Name"
          />
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            placeholder="Role"
          />
          <input
            className="w-full p-2 border rounded"
            type="number"
            name="expectedSalary"
            value={formData.expectedSalary || ""}
            onChange={handleChange}
            placeholder="Expected Salary"
          />
          <input
            className="w-full p-2 border rounded"
            type="date"
            name="expectedDefense"
            value={
              formData.expectedDefense
                ? new Date(formData.expectedDefense).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
