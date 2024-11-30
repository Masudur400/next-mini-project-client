import React from 'react';
import TaskDetails from './TaskDetails';

const page = ({params}) => {
    const id = params.taskId  
    return (
        <div>
            <TaskDetails id={id}></TaskDetails>
        </div>
    );
};

export default page;