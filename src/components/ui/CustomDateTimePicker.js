import * as React from 'react';
import {useState} from "react";
import './CustomDateTimePicker.css';

function CustomDateTimePicker({ label, inputValue, onChange}){

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const handleDateChange = (e) => {
        setDate(e.target.value);
        onChange(`${e.target.value} ${time}`);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
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
                    className="bg-gray-200 dark:bg-gray-800 border border-gray-300 rounded-l px-3 py-2 "
                />
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="bg-gray-200 dark:bg-gray-800 border border-gray-300 rounded-r px-3 py-2 "
                />
            </div>

    );
}
export default CustomDateTimePicker;