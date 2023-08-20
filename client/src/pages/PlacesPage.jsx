import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function PlacesPage() {
    const {action} = useParams();
  return (
    <div>
        {action !== 'new' && (
            <div className="text-center">
            <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Add New Place
            </Link>
        </div>
        )}
        {action === 'new' && (
            <div>
                <form action="">
                    <h2 className='text-2xl mt-4 font-semibold'>Title</h2>
                    <p className='text-gray-500 text-sm'>title for your place. should be short and catchy as in advertisements</p>
                    <input type="text" placeholder="Title, for example: My lovely apt"/>
                    <h2 className='text-2xl mt-4 font-semibold'>Adddress</h2>
                    <p className='text-gray-500 text-sm'>address to this place</p>
                    <input type="text" placeholder='Address'/>
                    <h2 className='text-2xl mt-4 font-semibold'>Photos</h2>
                    <p className='text-gray-500 text-sm'>more = better</p>
                    {/* Adding photos using links */}
                    <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    <button className='border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>+</button>
                    </div>
                </form>
            </div>
        )}
    </div>
  )
}
