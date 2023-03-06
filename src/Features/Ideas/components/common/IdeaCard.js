import React, {useState} from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, FormControl, FormControlLabel, InputLabel,
    MenuItem, Select,
    Slide, Switch
} from "@mui/material";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import {NavLink} from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function IdeaCard({idea}) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openViewIdeaModal, setOpenViewIdeaModal] = useState(false);


    const deleteIdea = (id) => {
        //TODO: make DELETE request and show notification on successful deleted
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const ideaCardStyle = `relative bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-[#283445] 
    shadow hover:shadow-lg hover:-translate-y-1 transition duration-500 ease-in-out p-8 
    border border-transparent hover:border-gray-300 hover:dark:border-gray-300 rounded-md`;

    return (
        <>
            <div
                className={ideaCardStyle}>
                <h2 onClick={()=>setOpenViewIdeaModal(true)} className="cursor-pointer text-gray-700 dark:text-gray-300 text-xl font-bold border-b mb-4">{idea.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{idea.description}</p>
                <div className="flex flex-wrap gap-2">
                    {idea.tags.map((tag) => (
                        <span key={tag}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300 text-sm"
                        >
            {tag}
          </span>
                    ))}

                    <DeleteIcon onClick={()=> setOpenDeleteModal(true)}
                                className={'absolute cursor-pointer text-rose-400 hover:text-rose-700 dark:text-rose-200 hover:dark:text-rose-300 bottom-2 right-1'}/>

                </div>
            </div>

            {/*Open DELETE confirmation Modal*/}
            <Dialog
                open={openDeleteModal}
                TransitionComponent={Transition}
                onClose={handleCloseDeleteModal}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle className={'text-center text-rose-900 bg-rose-50 dark:bg-rose-100'} >
                    <WarningAmberIcon sx={{fontSize: '65px'}} />
                </DialogTitle>

                <DialogContent className={'bg-rose-50 dark:bg-rose-100'}>

                    {/*<h2 className={'text-2xl font-bold text-center text-rose-900 bg-rose-50 dark:bg-rose-100'}>DELETE Idea</h2>*/}

                    <DialogContentText sx={{textAlign: 'center'}} id="alert-dialog-slide-description">
                        Are you sure you want to delete the idea:
                        <span className="italic text-gray-700"> "{idea.title}" </span>?
                    </DialogContentText>

                </DialogContent>

                <DialogActions className={'bg-rose-50 dark:bg-rose-100'}>
                    <Button onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button color="error" onClick={()=>deleteIdea(idea.id)}>DELETE</Button>
                </DialogActions>
            </Dialog>

            {/*Open View Idea Modal*/}
            <Dialog
                fullScreen
                TransitionComponent={Transition}
                open={openViewIdeaModal}
                onClose={()=>setOpenViewIdeaModal(false)}
            >
                <DialogTitle className={'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}>
                    <TipsAndUpdatesIcon/> {idea.title}</DialogTitle>
                    <Button sx={{position:'absolute',
                        top:'10px',
                        right: '10px', display: {xs: 'none', md: 'block'}}}
                            onClick={()=>setOpenViewIdeaModal(false)}><CloseIcon/></Button>
                <DialogContent className={'bg-white dark:bg-gray-700'}>

                        <h4 className={'text-xl text-gray-700 dark:text-gray-300 border-b'}><TextSnippetIcon/> Idea Description</h4>
                    <DialogContentText className={'pt-3 text-gray-700 dark:text-gray-400'}>
                            {idea.description}
                    </DialogContentText>

                </DialogContent>

                <DialogActions sx={{display: 'block', textAlign: 'center'}} className={'bg-gray-50 dark:bg-gray-800'}>

                    {idea.goalTitle
                        ? (
                            <div className={'p-3 border-b text-gray-700 dark:text-gray-400'}>
                                <span className={'font-semibold'}><SportsScoreIcon/> GOAL: </span>
                                <NavLink to={'/goals/'+idea.goalId}
                                         className={'inline hover:underline hover:text-cyan-700 dark:hover:text-cyan-100'}>
                                    {idea.goalTitle}
                                </NavLink>
                            </div>
                        )
                        : ''
                    }

                    <Button sx={{display: {md: 'none'}}} onClick={()=>setOpenViewIdeaModal(false)}>
                        <CloseIcon/>
                    </Button>

                </DialogActions>

            </Dialog>
        </>
    );
}

export default IdeaCard;
