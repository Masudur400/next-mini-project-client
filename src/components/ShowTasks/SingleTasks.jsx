import Link from 'next/link';
import React from 'react'; 

const SingleTasks = ({tasks}) => {
    const {_id,task, description} = tasks
    

    return (
        <Link href={`/${_id}`}>
        <div className='p-3 shadow-md border border-base-300 rounded-md hover:shadow-lg space-y-2 min-h-20'>
        <h2 className="text-lg opacity-80">{task}</h2>
        {/* <p>{description}</p> */}
    </div>
      </Link>
    );
};

export default SingleTasks;