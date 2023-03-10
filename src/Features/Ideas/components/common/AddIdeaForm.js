import {useEffect, useRef, useState} from 'react';
import {Button, Chip, TextField} from '@mui/material';

const AddIdeaForm = ({goalId,handleClose}) => {

    // const { goalId } = useParams();
    // useEffect(() => {
    //     console.log('App.js goalId: ', goalId);
    // },[goalId]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const [inputTag, setInputTag] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        setTitleError(false);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
        setDescriptionError(false);
    };

    const trimAndRemoveSpaces = (event) =>{
        const tag = event.target.value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z]/g, '')
            .replace(/\s/g, '');
        event.currentTarget.value = tag;
        setInputTag(tag);
    }

    const handleAddTag = (event,clicked) => {

        if (clicked) {
            if (inputTag !== '' && !tags.includes(inputTag)) {
                setTags([...tags, inputTag]);
                setInputTag('');
            }
            return;
        }

        const newTag = event.target.value.trim().toLowerCase().replace(/[^a-zA-Z]/g, '').replace(/\s/g, '');

        if (event.key === 'Enter') {
            if (newTag !== '' && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setInputTag('');
                event.target.value = '';
            }
        } else if (event.key === ' ' && event.target.value.trim() !== '') {
            event.preventDefault();
            if (newTag !== '' && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                setInputTag('');
                event.target.value = '';
            }
        }
    };


    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    const addNewIdeaHandler = (e) => {
        e.preventDefault();

        if (inputTag) {
            if (inputTag !== '' && !tags.includes(inputTag)) {
                setTags([...tags, inputTag]);
                setInputTag('');
                e.currentTarget.tag.vlaue = '';
                e.currentTarget.vlaue = '';
            }
            return;
        }

        //Trim and remove double spaces in the title and description
        setTitle(title.trim().replace(/\s+/g, ' '));
        setDescription(description.trim().replace(/\s+/g, ' '));

        if (!title) {
            setTitleError(true);
            return;
        }
        if (!description) {
            setDescriptionError(true);
            return;
        }
        const newIdea = {
            title,
            description,
            tags,
        };
        console.log('New Idea: ', newIdea);
    }

    return (
        <form onSubmit={addNewIdeaHandler} className={'p-3 md:p-10'}>

            {goalId
                ? (
                    <div>
                        <h2 className={'text-center'}>
                            <span className={'font-bold'}>Idea for GOAL:</span>
                            Goal Title with ID: {goalId}
                        </h2>
                    </div>
                )
                : ''}

            <div className="mb-4">
                <TextField
                    inputProps={{className: 'text-gray-700 dark:text-gray-300'}}
                    fullWidth
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={handleTitleChange}
                    error={titleError}
                    helperText={titleError && 'Title is required'}
                />
            </div>
            <div className="mb-4">
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={handleDescriptionChange}
                    error={descriptionError}
                    helperText={descriptionError && 'Description is required'}
                />
            </div>
            <div className="mb-4">
                {tags.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        className="mr-2 mb-2"
                    />
                ))}
            </div>
            <div className="mb-4 flex gap-2 md:block">
                <TextField
                    fullWidth
                    label="Tags"
                    name={'tag'}
                    value={inputTag}
                    variant="outlined"
                    onChange={trimAndRemoveSpaces}
                    onKeyDown={handleAddTag}
                    InputProps={{ style: { textTransform: 'lowercase' } }}
                />
                <Button sx={{display:{sm: 'none'}, whiteSpace: 'nowrap'}}
                        variant="outlined"
                        onClick={(e)=>handleAddTag(e,true)} >Add Tag</Button>
            </div>
            <div className={'flex gap-5'}>
                <Button variant="contained" color="primary" type="submit">
                    Add Idea
                </Button>
                <Button variant="contained" color="secondary" onClick={()=> handleClose(false)} className="ml-2">
                    Cancel
                </Button>
            </div>
        </form>

    );
};

export default AddIdeaForm;
