'use client'
import React from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import SingleManageTask from './SingleManageTask';

const ManageTasks = () => {

    const axios = useAxios()

    const { data: allTasks =  [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', axios],
        queryFn: async () => {
            const res = await axios.get(`/tasks`)
            return res.data
        }
    })

    if (isLoading) {
        return <p className='flex justify-center items-center h-[400px]'>Loading.......</p>
    }

    return (
        <div className='grid gap-4'>
            {
                allTasks.map(tasks => <SingleManageTask key={tasks._id} tasks={tasks} refetch={refetch}></SingleManageTask>)
            }
        </div>
    );
};

export default ManageTasks;