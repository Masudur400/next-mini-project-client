import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';
import useAxios from '../hooks/useAxios';
import toast, { Toaster } from 'react-hot-toast';

const SingleManageTask = ({ tasks, refetch }) => {
    const axios = useAxios()
    const { _id, task, description } = tasks

    const handleDelete = task => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete task...!",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/tasks/${task?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            toast.success('Task Deleted')
                        }
                    })
            }
        });
    }


    return (
        <div className='px-2 md:px-7 md:py-12 p-3  shadow-md rounded-md  border-y-4 border-sky-500 bg-background'>
            {/* <Toaster></Toaster> */}
            <h2 className="text-lg opacity-80">{task}</h2>
            <p className='my-3'>{description}</p>

            <div className='flex items-center gap-5'>
                <Link href={`/edit-task/${_id}`}>
                    <button className='hover:shadow-md border font-bold px-8 py-2 rounded-md  border-b-4 border-sky-500 text-sky-500 mt-3'>Edit</button>
                </Link>
                <button onClick={() => handleDelete(tasks)} className='hover:shadow-md border font-bold px-8 py-2 rounded-md  border-b-4 border-sky-500 text-sky-500 mt-3'>Delete</button>
            </div>
        </div>
    );
};

export default SingleManageTask;