import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks'
import axios from 'axios';

export default function PlacesPage() {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtrainfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState('');

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

    // for uploading photos using links
    async function addPhotoByLink(event) {
        event.preventDefault();
        const {data: filename} = await axios.post('/upload-by-link',{link: photoLink});
        setAddedPhotos((prev) => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    // for uploading photos from user device
    function uploadPhoto(event) {
        const files = event.target.files;
        const data = new FormData();
        for(let i=0; i<files.length; i++) {
            data.append('photos', files[i]);
        }
        axios.post('/upload', data, {
            headers: {'Contect-Type':'multipart/form-data'}
        })
        .then((response) => {
            const {data: filenames} = response;
            console.log(filenames);
            setAddedPhotos((prev) => {
                return [...prev, ...filenames];
            });
        })
    }

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

                        {preInput('Title', 'title for your place. should be short and catchy as in advertisements')}
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="title, for example: My lovely apt" />

                        {preInput('Address', 'address to this place')}
                        <input type="text" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder='address' />

                        {preInput('Photos', 'more = better')}
                        <div className='flex gap-2'>
                            <input type="text" value={photoLink} onChange={(e) => {setPhotoLink(e.target.value)} } placeholder={'add using a link ....jpg'} />
                            <button onClick={addPhotoByLink} className='bg-gray-200 grow px-4 rounded-2xl font-semibold'>Add&nbsp;photo</button>
                        </div>
                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
                                <div className='h-32 flex' key={index}>
                                    <img className='rounded-2xl w-full object-cover' src={"http://localhost:4000/uploads/"+link} alt="No image found" />
                                </div>
                            ))}
                            <label className='h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                                <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </label>
                        </div>

                        {preInput('Description', 'description of the place')}
                        <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} cols="30" rows="5"></textarea>

                        {preInput('Perks', 'select all the perks of your place')}
                        <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                            <Perks selected={perks} onChange={setPerks} />
                        </div>

                        {preInput('Extra info', 'house rules, etc')}
                        <textarea value={extraInfo} onChange={(e) => { setExtrainfo(e.target.value) }} />

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
            )}
        </div>
    )
}