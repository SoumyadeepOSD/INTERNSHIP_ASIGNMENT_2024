export const InputField = ({label, type, placeholder}) => {
    return(
        <div className="flex flex-col items-start justify-start w-full">
            <label className="font-bold">{label}</label>
            <input type={type} placeholder={placeholder} className="w-full outline-none bg-slate-100 p-3 rounded-md"/>
        </div>
    );
}