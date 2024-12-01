'use client'
import useAxios from '@/components/hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

const TaskDetails = ({ id }) => {

    const axios = useAxios()

    const { data: tasks = {}, isLoading, refetch } = useQuery({
        queryKey: ['tasks', axios, id,],
        queryFn: async () => {
            const res = await axios.get(`/tasks/${id}`)
            return res.data
        }
    })

    const { _id, task, description } = tasks

    if (isLoading) {
        return <p className='flex justify-center items-center h-[400px]'>Loading.......</p>
    }

    return (
        <div className='md:px-7 md:py-14 p-3  shadow-md rounded-md  border-y-4 border-sky-500'>
            <h2 className="text-lg opacity-80">{task}</h2>
            <p className='mt-3'>{description}</p> 
        </div>
    );
};

export default TaskDetails;