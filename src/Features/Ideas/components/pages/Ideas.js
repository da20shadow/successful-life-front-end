import React, {useEffect, useState} from 'react';
import IdeaCard from "../common/IdeaCard";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import './Ideas.css';
import {NavLink, useParams} from "react-router-dom";
import {Dialog, Fab, Slide, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {AddIdeaForm} from "../index";
import {useSelector} from "react-redux";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddIcon from '@mui/icons-material/Add';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Ideas() {
    const {goalId} = useParams();
    const user = useSelector(state => state.user);

    const [goalTitle, setGoalTitle] = useState('');
    const [ideas, setIdeas] = useState([
        {
            id: 1,
            title: 'Learn a new language',
            description: 'Take a language course online and practice every day',
            tags: ['language', 'learning'],
            createdAt: '2022-03-05T10:30:00.000Z',
            updatedAt: '2022-03-05T10:30:00.000Z',
        },
        {
            id: 2,
            title: 'Read more books',
            description: 'Set a goal to read one book per week',
            tags: ['reading', 'goals'],
            createdAt: '2022-03-06T14:00:00.000Z',
            updatedAt: '2022-03-06T14:00:00.000Z',
        },
        {
            id: 3,
            title: 'Create a mobile app for the application and etc so it ala bala..',
            description: 'Set a goal to create a mobile app',
            goalId: 3,
            goalTitle: 'This is Goal Title Android Application',
            tags: ['android app', 'goals'],
            createdAt: '2022-03-06T14:00:00.000Z',
            updatedAt: '2022-03-06T14:00:00.000Z',
        },
        {
            id: 4,
            title: 'I do not know  ;d ',
            description: 'Set a goal to create a mobile app',
            tags: ['android app', 'goals'],
            createdAt: '2022-03-06T14:00:00.000Z',
            updatedAt: '2022-03-06T14:00:00.000Z',
        },
        {
            id: 5,
            title: 'I do not know  ;d ',
            description: 'Set a goal to create a mobile app',
            tags: ['business'],
            createdAt: '2022-03-06T14:00:00.000Z',
            updatedAt: '2022-03-06T14:00:00.000Z',
        },
        {
            id: 6,
            title: 'New business  ;d ',
            description: 'Set a goal to create a mobile app',
            tags: ['business', 'dropshiping'],
            createdAt: '2022-03-06T14:00:00.000Z',
            updatedAt: '2022-03-06T14:00:00.000Z',
        },
        {
            id: 7,
            title: 'More business  ;d ',
            description: 'Set a goal to create a mobile app',
            tags: ['business', 'agency'],
            createdAt: '2022-03-06T14:00:00.000Z',
            updatedAt: '2022-03-06T14:00:00.000Z',
        },
    ]);

    const [tags, setTags] = useState([
        'language', 'reading', 'learning', 'android', 'app', 'business'
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    //Set states for Idea
    const [openAddIdeaModal, setOpenAddIdeaModal] = useState(false);

    useEffect(() => {
        if (goalId) {
            //GET all goal ideas by goal id
            setGoalTitle('Goal Title ID ' + goalId)
        } else {
            //GET all ideas
            //TODO: Get all tags from all ideas on the current user
        }
    }, [goalId]);

    const [selectedTag, setSelectedTag] = useState('');

    //Make request to the server to get all ideas which includes the selected tag
    const handleTagSelect = (tag) => {
        //TODO: remove the setSearchTerm
        // and make request to server that returns all ideas that has this tag
        setSearchTerm(tag);
        setSelectedTag(tag);
    };

    //TODO: If the ideas are less than 20 no need to make request to the server with search query
    // Just have to filter them with js here. If they are 20 then will make Back End for DB search
    const filteredIdeas = ideas.filter((idea) => {
        const keywordMatch = idea.title.toLowerCase().includes(searchTerm.toLowerCase());
        const tagMatch = idea.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        return keywordMatch || tagMatch;
    });


    //Open modal for adding new idea
    const addNewIdea = () => {
        setOpenAddIdeaModal(true);
    };

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-gray-700 dark:text-gray-300 text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
                    Ideas <TipsAndUpdatesIcon sx={{fontSize: '45px', color: '#ecc06e'}}/>
                </h1>
                {goalId
                    ? (<h4 className={'mb-3 text-center text-gray-700 dark:text-gray-300'}>
                        <SportsScoreIcon/>
                        <span className={'font-semibold'}>GOAL: </span>
                        <NavLink to={`/goals/${goalId}`}
                                 className={'hover:underline hover:text-cyan-700 dark:hover:text-cyan-100'}>
                            {goalTitle}
                        </NavLink>
                    </h4>)
                    : ''
                }

                {/*Search by tag*/}
                <div className="flex justify-center mb-8">
                    <div
                        className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md py-2 px-4 flex flex-wrap items-center space-x-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Filter by tag:</span>
                        <button
                            className={`${
                                !selectedTag && 'bg-blue-500 text-white'
                            } rounded-md px-2 py-1 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200`}
                            onClick={() => handleTagSelect('')}
                        >
                            All
                        </button>
                        {
                            tags.map(t => (
                                <button key={t}
                                        className={`${
                                            selectedTag === t.toLowerCase() && 'bg-blue-500 text-white'
                                        } rounded-md px-2 py-1 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200`}
                                        onClick={() => handleTagSelect(t.toLowerCase())}
                                >
                                    {t}
                                </button>
                            ))
                        }
                    </div>
                </div>

                {/*Search bar*/}
                <div className="flex justify-center items-center mb-8">
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="search"
                            placeholder="Search by keyword or tag"
                            className="dark:bg-gray-300 px-4 py-2 border rounded-md w-full shadow"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 15l-5-5 5-5"
                  ></path>
                </svg>
              </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredIdeas.map((idea) => (
                        <IdeaCard key={idea.id} idea={idea}/>
                    ))}
                </div>

                {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">*/}
                {/*    {ideas.map((idea) => (*/}
                {/*        <IdeaCard key={idea.id} idea={idea} />*/}
                {/*    ))}*/}
                {/*</div>*/}

            </div>

            {/*Add Idea Button*/}
            <Fab sx={{position: 'fixed', bottom: 65, right: 16}}
                 onClick={() => addNewIdea()}
                 color="primary" aria-label="add">
                <AddIcon/>
            </Fab>

            <Dialog
                fullWidth
                open={openAddIdeaModal}
                TransitionComponent={Transition}
                onClose={() => setOpenAddIdeaModal(false)}
                aria-describedby="add-idea-modal"
            >
                <AddIdeaForm goalId={goalId} handleClose={setOpenAddIdeaModal}/>

            </Dialog>

        </>

    );
}

export default Ideas;