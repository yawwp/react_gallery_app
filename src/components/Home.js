import React from 'react';
import { useEffect } from 'react';
import Photo from './Photo';

function Home(props) {
  const photos = props.data.photos;
  const photo = photos.photo;
  const input = props.input;
    useEffect(() => {
        props.getData("Home");
    },[]);
  
  if (photo.length > 0) {
      return ( 
        <div className="photo-container">
        <h2> {input} Results</h2>
          <ul>
            {
              photo.map((item,index) => <Photo photos={item} index={index}  key ={item.id.toString()}/>)
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

export default Home;