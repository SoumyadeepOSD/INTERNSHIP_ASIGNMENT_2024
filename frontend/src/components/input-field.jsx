import { TriangleAlertIcon } from "lucide-react";

export const InputField = ({ label, type, placeholder, onChange, duplicateField }) => {
    const formStyle = label === duplicateField ? 'w-full outline-none p-3 rounded-md bg-red-100 text-red-500' : 'w-full outline-none p-3 rounded-md bg-slate-100';
    return (
        <div className="flex flex-col items-start justify-start w-full">
            <label className="font-bold">
                <div className="flex items-center">
                    {label === duplicateField && <TriangleAlertIcon className="text-orange-500 mr-1" />}
                    {label}
                </div>
            </label>
            <input
                type={type}
                placeholder={placeholder}
                className={formStyle}
                onChange={onChange}
            />
        </div>
    );
}
