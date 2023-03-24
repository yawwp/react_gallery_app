import React from 'react'

function Photo(props) {
    const photo = props.photos;
    return (
        <li>
            <img src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg}`} alt = '' />
        </li>
        )
}

export default Photo