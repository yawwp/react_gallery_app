import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Route, Routes, redirect } from 'react-router-dom'

//config 
import config from './config'

//App components
import Home from './components/Home'
import Photo from './components/Photo'
import Search from './components/Search'
import Nav from './components/Nav'
import Error from './components/Error'

function App() {
    //Setting state for api search 
    const [input, setInput] = useState("Home");

    //Array of data based on 'input' state
    const [data, setData] = useState(null);

    //Error Data for <Error/> 
    const [error,setError] = useState(null);

    //Loading
    const [loading, setLoading] = useState(false);


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
                setError(err);
                console.log(err);
            }
        };
        fetchPhotos();
    },[input])
    
    function getData(data){
        setInput(data);
    }

    function clearData(){
        setData();
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
                        element={data && !loading ? <Photo 
                            data={data} 
                            getData={getData} 
                            input={input}
                            clearData={clearData}
                            />  : 'Searching.... '} />
                <Route path='/*' element={<Error/>} />
            </Routes>
        </div>

    )
}

export default App;