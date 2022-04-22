import React, { useState, useEffect } from 'react'
import '../components/time.css'

import { createApi } from 'unsplash-js';




const Time = () => {
    const [timeState, setTimeState] = useState(new Date());
    // const [query, setQuery] = useState("");
    const [imgState, setImgState] = useState([]);


    useEffect(() => {
        setInterval(() => setTimeState(new Date()), 100)
    }, [])



    const unsplash = createApi({
        accessKey: 'rHhDMPMmtRdT5L-sEdyBbEvtmnClTQnvpJpkWa_ko9g',
        // `fetch` options to be sent with every request
        headers: { 'X-Custom-Header': 'foo' },
    });


    useEffect(() => {

        unsplash.photos.getRandom({
            // collectionIds: ['4fHcqfSpUR4'],
            count: 1,
            query: 'landscape',
            orientation: 'landscape',

        }).then(result => {
            if (result.errors) {
                // handle error here
                console.log('error occurred: ', result.errors[0]);
            } else {
                // handle success here
                const photo = result.response;
                setImgState(photo);
                console.log(photo);
            }
        });
        console.log(imgState[0])
    }, [])


    return (
        <div className='time'>
             <div className='background'>
                {typeof imgState[0] === 'undefined' ? (
                    <div>
                        hello
                    </div>
                ) : (
                    <img src={imgState[0].urls.raw} />
                )}
            </div>
            <div className='front'>
                <p className='front-minute'>{timeState.toLocaleTimeString('en-GB', {
                    second: 'numeric',
                    minute: 'numeric',
                    hour: 'numeric',
                })}</p>
                <p className='front-day'>{timeState.toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })}</p>
            </div>
           
            
        </div>
    )
}

export default Time