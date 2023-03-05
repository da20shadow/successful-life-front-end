import React from 'react';

function IdeaCard({ idea }) {
    return (
        <div className="bg-white dark:bg-gray-600 shadow-md hover:shadow-lg hover:scale-[1.01] transition duration-300 ease-in-out p-8 rounded-md">
            <h2 className="cursor-pointer text-gray-700 dark:text-gray-300 text-xl font-bold border-b mb-4">{idea.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{idea.description}</p>
            <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300 text-sm"
                    >
            {tag}
          </span>
                ))}
            </div>
        </div>
    );
}

export default IdeaCard;
