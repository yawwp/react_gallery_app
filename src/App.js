import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'

//config 
import config from './config'

//App components
import Home from './components/Home'
import PhotoContainer from './components/PhotoContainer'
import Search from './components/Search'
import Nav from './components/Nav'
import Error from './components/Error'

function App() {
    //Setting state for api search 
    const [input, setInput] = useState("Home");

    //Array of data based on 'input' state
    const [data, setData] = useState(null);

    //Testing if data loading is true or false
    const [loading, setLoading] = useState(false);

    //Fetching data based on api + input
    useEffect(()=> {
        setLoading(true);
        const fetchPhotos = async () => {
            try{
                const api = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${config}&tags=${input}&format=json&nojsoncallback=1`;
                const res = await axios.get(api);
                if (res && res.data) {
                    setData(res.data);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchPhotos();
    },[input])
    
    //Callback function to set input from child components
    function getData(data){
        setInput(data);
    }

    return (
        <div className='container'>
            <Search/>
            <Nav getData={getData}/>
            
            <Routes>
                <Route path='/' 
                    element={data ? <Home 
                        data={data} 
                        getData={getData} 
                        input={input} 
                        /> : 'Loading.....' }/> 
                    <Route path='/search/:search' 
                        element={data && !loading ? <PhotoContainer 
                            data={data} 
                            getData={getData} 
                            input={input}
                            />  : 'Searching.... '} />
                <Route path='/*' element={<Error/>} />
            </Routes>
        </div>

    )
}

export default App;