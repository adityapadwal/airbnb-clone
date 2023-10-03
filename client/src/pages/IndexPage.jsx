import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Image from '../Image';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
    .get('/places')
    .then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
      {places.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} key={place._id}>
          <div className='bg-gray-500 mb-2 rounded-2xl'>
            {place.photos?.[0] && (
              <Image className='rounded-2xl object-cover aspect-square' src={place.photos?.[0]} alt="" />
            )}
          </div>
          <h2 className='font-bold '>{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className='mt-1'>
            <span className='font-bold'>₹{place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
  );
}

