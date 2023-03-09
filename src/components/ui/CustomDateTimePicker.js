import * as React from 'react';
import {useState} from "react";

function CustomDateTimePicker({ label, inputValue, onChange}){

    const [date, setDate] = useState(inputValue ? inputValue.substr(0, 10) : '');
    const [time, setTime] = useState(inputValue ? inputValue.substr(11, 5) : '');

    const handleDateChange = (e) => {
        setDate(e.target.value);
        onChange(`${e.target.value} ${time}`);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
        if (date === '') {
            const today = new Date();
            const year = today.getFullYear();
            const month = `${today.getMonth() + 1}`.padStart(2, '0');
            const day = `${today.getDate()}`.padStart(2, '0');
            return onChange(`${year}-${month}-${day} ${e.target.value}`);
        }
        onChange(`${date} ${e.target.value}`);
    };

    return (
            <div className={'mb-3 flex items-center'}>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 rounded-l px-3 py-2 "
                />
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 rounded-r px-3 py-2 "
                />
            </div>
    );
}
export default CustomDateTimePicker;