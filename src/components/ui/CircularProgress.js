import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgress = ({ progress }) => {
    return (
        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto">
            <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                strokeWidth={6}
                styles={{
                    path: {
                        stroke: `hsl(${progress}, 100%, 50%)`,
                        strokeLinecap: 'round',
                    },
                    trail: {
                        stroke: '#ddd',
                        strokeLinecap: 'round',
                    },
                    text: {
                        fill: 'black',
                        fontSize: '20px',
                    },
                }}
            />
        </div>
    );
};

export default CircularProgress;
