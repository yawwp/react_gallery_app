import React from 'react'

function Photo(props) {
    const photo = props.photos.photo;
    return (
        <><h2> {props.input} Results</h2><ul>
            {
            photo.map((item) => (
            <li key={item.id}>
                <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg}`} alt = '' />
            </li>
        ))}
        </ul></>
    )
}

export default Photo