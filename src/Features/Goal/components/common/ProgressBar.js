import React from 'react';

const ProgressBar = ({ bgColor, progress }) => {
    return (
        <div className="relative w-full h-5 bg-gray-200 dark:bg-gray-600 border dark:border-gray-200 rounded-full">
            <div
                className={bgColor + " text-sm text-center text-gray-300 absolute top-0 left-0 h-full rounded-full"}
                style={{ width: `${progress}%` }}
            >{progress}%</div>
        </div>
    );
};

export default ProgressBar;
