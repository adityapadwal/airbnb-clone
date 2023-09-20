import React, { useState } from 'react'
import Perks from '../Perks'
import PhotosUploader from '../PhotosUploader';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { Navigate } from 'react-router-dom';

export default function PlacesFormPage() {
    
    // State variables
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtrainfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState('');

    const[redirect, setRedirect] = useState(false);

    // Form headers
    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4 font-semibold'>{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        );
    }

    async function addNewPlace(event) {
        event.preventDefault();
        const placeData = {
            title,
            address, 
            addedPhotos, 
            description, 
            perks, 
            extraInfo, 
            checkIn, 
            checkOut, 
            maxGuests
        };
        await axios.post('/places', placeData);
        setRedirect(true);
    }

    if(redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />

            <form onSubmit={addNewPlace}>

                {/* Title */}
                {preInput('Title', 'title for your place. should be short and catchy as in advertisements')}
                <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="title, for example: My lovely apt" />

                {/* Description */}
                {preInput('Address', 'address to this place')}
                <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder='address' />

                {/* Photos */}
                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {/* Description */}
                {preInput('Description', 'description of the place')}
                <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} cols="30" rows="5"></textarea>

                {/* Perks */}
                {preInput('Perks', 'select all the perks of your place')}
                <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {/* Extra Information */}
                {preInput('Extra info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={(e) => { setExtrainfo(e.target.value) }} />

                {/* Rest of the info */}
                {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-4 '>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input type="text" value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} placeholder='11:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input type="text" value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} placeholder='16:00' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={(e) => { setMaxGuests(e.target.value) }} placeholder='4' />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Price per night</h3>
                        <input type="text" value={price} onChange={(e) => { setPrice(e.target.value) }} placeholder='4000' />
                    </div>
                </div>

                <div>
                    <button className='primary my-4'>Save</button>
                </div>
            </form>
        </div>
    )
}
