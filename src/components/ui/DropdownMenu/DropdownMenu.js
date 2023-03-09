import React, {useEffect, useRef, useState} from "react";

function DropdownMenu({value,options,onChange,isLeftPosition}){

    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setStatusDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const menuChanged = (option) => {
        onChange(option);
        setStatusDropdownOpen(false);
    }

    //TODO: add the option to close the dropdown when clicked outside the dropdown!
    // using useEffect and useHref there is an example in Tailwind and MUI chat in chatGPT

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="block w-full p-2 text-center rounded-lg focus:outline-none focus:shadow-outline-purple"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            >
                {value}
            </button>

            {
                statusDropdownOpen
                    ? (
                    <div className={`absolute ${isLeftPosition ? 'left-1' : 'right-1'} z-20 mt-1 rounded-lg ${statusDropdownOpen ? '' : 'hidden'}`}>
                        <div className={`px-2 py-1 w-fit border bg-white dark:bg-gray-900 rounded-lg shadow`}>
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`my-1 block w-full whitespace-nowrap text-left py-2 px-3 dark:text-gray-400 dark:hover:text-gray-300 rounded-lg dark:hover:bg-gray-800 hover:bg-gray-200 hover:text-gray-800 ${
                                        value === option.name ? 'bg-gray-200 dark:bg-gray-800 dark:text-white text-gray-700' : ''
                                    }`}
                                    onClick={() => menuChanged(option.name)}
                                >
                                    {option.icon ? (<span className={'mr-2'}>{option.icon}</span>) : ''}
                                    {option.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    )
                    : ''
            }

        </div>
    )
}
export default DropdownMenu;