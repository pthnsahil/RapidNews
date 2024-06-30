import React, { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';

function News() {
    const headlines = JSON.parse(localStorage.getItem('headlines'));
    const source = localStorage.getItem('source');
    const email = localStorage.getItem('email');
    const [bookmarked, setBookmarked] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('temp'));

    const Links={
        "TV9 GUJARATI": "https://tv9gujarati.com/",
        "BBC GUJARATI": "https://www.bbc.com/gujarati",
        "ABP ASMITA": "https://gujarati.abplive.com/",
        "INDIAN EXPRESS GUJARATI": "https://gujarati.indianexpress.com/"
    }
    useEffect(() => {
        axios.post('http://localhost:5000/news/bookmark', { email,bookmarked })
            .then((res) => { setBookmarked(res.data); })
            .catch((err) => console.log(err));
    }, []);

    function handleLink(source)
    {
       window.location.href=Links[source];
    }

    function handleBookmark(article) {
            if(isLoggedIn)
            {
            const  bookmarks = { ...bookmarked };
   
            if (!bookmarks[source].includes(article)) {
                bookmarks[source] = [...bookmarks[source], article];
            } else {
                bookmarks[source] = bookmarks[source].filter(item => item !== article);
            }

            axios.post('http://localhost:5000/news/bookmark', { email, bookmarked: bookmarks })
                .then((res) =>  setBookmarked(res.data))
                .catch((err) => console.log(err));   
        }else
        {
            toast.error("please login");
        }        
    }

    return (
        <>
            <Navbar />
            <ToastContainer/>
            <div style={{ textAlign: "center", fontSize: "60px" ,marginTop:"4rem" }}  onClick={()=>handleLink(source)}>{source}</div>
            <div className='row d-flex justify-content-center' style={{ marginLeft: "20%", width: "60%" }}>
                {headlines[source] && Object.values(headlines[source]).map((article, index) => (
                    <div key={index} className="mt-3 d-flex align-items-center" style={{ fontSize: "20px" }}>
                        <button
                            className={`btn btn-sm ${bookmarked[source] && bookmarked[source].includes(article) ? 'btn-danger' : 'btn-light'}`}
                            onClick={() => handleBookmark(article)} style={{ marginRight: "20px" }}>
                            {bookmarked[source] && bookmarked[source].includes(article)
                                ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
                                    <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-heart" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                                </svg>}
                        </button>
                        <span>{article}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default News;

