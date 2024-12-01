import React from 'react';
import EditTask from './EditTask';

const page = ({params}) => {

    const id = params.id

    return (
        <div>
             <EditTask id={id}></EditTask>
        </div>
    );
};

export default page;