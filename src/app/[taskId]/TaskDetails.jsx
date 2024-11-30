'use client'
import useAxios from '@/components/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const TaskDetails = ({id}) => {

    const axios = useAxios()

    const { data: tasks = {}, isLoading, refetch } = useQuery({
        queryKey: ['tasks', axios, id,],
        queryFn: async () => {
            const res = await axios.get(`/tasks/${id}`)
            return res.data
        }
    })

    const {task, description} = tasks

    if(isLoading){
        return <p className='flex justify-center items-center h-[400px]'>Loading.......</p>
    }

    return (
        <div>
            <h2 className="text-lg opacity-80">{task}</h2>
            <p>{description}</p>
        </div>
    );
};

export default TaskDetails;