import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom'
import AccountNav from '../AccountNav';
import axios from 'axios';

export default function PlacesPage() {
    
    const[places, setPlaces] = useState([]);
    useEffect(() => {
        axios
        .get('/user-places')
        .then(({data}) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
                <div className="text-center">
                    <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        Add New Place
                    </Link>
                </div>
                <div className="mt-4">
                    {places.length > 0 && places.map((place) => (

                        <Link to={'/account/places/'+place._id} className='flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl' key={place._id}>
                            <div className='flex w-32 h-32 bg-gray-300 shrink-0'>
                                {place.photos.length > 0 && (
                                    <img className='object-cover' src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                                )}
                            </div>
                            <div className='grow-0 shrink'>
                                <h2 className='text-xl'>{place.title}</h2>
                                <p className='text-small mt-2 '>{place.description}</p>
                            </div>
                        </Link>

                    ))}
                </div>
        </div>
    )
}