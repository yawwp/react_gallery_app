import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Photo from './Photo';

function PhotoContainer(props) {
  const photos = props.data.photos;
  const photo = photos.photo;
  const { search } = useParams();
  useEffect(() => {
    props.getData(search);
  },[search])
  
  if (photo.length > 0) {
      return ( 
        <div className="photo-container">
          <h2> {props.input} Results</h2>
          <ul>
            {
              photo.map((item) => <Photo photos={item} key ={item.id.toString()}/>)
            }
          </ul>
        </div>
        )
        } else {
          return (
            <div className='not-found'>
              <h2>No Results Found</h2> 
              <p>Your search did not return any results. Please try again.</p>
            </div>
            )
        }
}

export default PhotoContainer;