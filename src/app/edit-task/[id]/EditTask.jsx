'use client'
import useAxios from '@/components/hooks/useAxios';
import { useQuery } from '@tanstack/react-query'; 
import { useRouter } from 'next/navigation';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const EditTask = ({id}) => {

    const axios = useAxios()
    const router = useRouter()

    const { data: tasks = {}, isLoading, refetch } = useQuery({
        queryKey: ['tasks', axios, id,],
        queryFn: async () => {
            const res = await axios.get(`/tasks/${id}`)
            return res.data
        }
    })

    const { _id, task, description } = tasks

    const editTask = async (e) =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        const task = form.get('task')
        const description = form.get('description')

        const data ={
            task  ,
            description  
        }

        const res = await axios.patch(`/tasks/ta/${_id}`, data)

            if (res.data.modifiedCount > 0) { 
                 toast.success('Task edited successful')
                refetch()
                router.push('/manage-task')
            } 
        
    }

    return (
        <div className='md:px-7 md:py-14 p-3  shadow-md rounded-md  border-y-4 border-sky-500'>
            {/* <Toaster></Toaster> */}
            <h3 className="text-2xl font-bold text-center text-sky-500">Edit A Task</h3>
            <div>
                <form onSubmit={editTask} className='md:w-3/4 mx-auto space-y-3'>
                    <div className="w-full">
                        <label htmlFor="task" className="font-bold"> Task </label>
                        <input
                            type="text"
                            name="task"
                            id="task"
                            defaultValue={task}
                            placeholder="Task Title"
                            className=" border rounded-md outline-none px-4 w-full mt-1 py-2 focus:border-sky-500 transition-colors duration-300"
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="description" className="font-bold"> Description </label>
                        <textarea
                            type="text"
                            name="description"
                            id="description"
                            defaultValue={description}
                            placeholder="Write description"
                            className="border  rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[100px] focus:border-sky-500 transition-colors duration-300"
                        />
                    </div>

                    <div className='flex justify-center items-center'>
                        <button type='submit' className='hover:shadow-md border w-40 font-bold px-4 py-2 rounded-md  border-b-4 border-sky-500 text-sky-500'>Edit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTask;