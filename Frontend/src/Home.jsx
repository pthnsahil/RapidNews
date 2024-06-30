import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation, useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { CardGroup, Card } from 'react-bootstrap';
import './Home.css'
import { toast ,ToastContainer} from 'react-toastify';


function Home() {
    const [headlines, setHeadlines] = useState({});
    const location=useLocation();
    const navigate=useNavigate();
   
    const images = {
        "TV9 GUJARATI": "tv9.jpg",
        "BBC GUJARATI": " bbc.jpg",
        "ABP ASMITA": "abp.jpg",
        "INDIAN EXPRESS GUJARATI": "indian_express.webp"
    }

    async function fetchHeadlines() {
        try {
            const response = await axios.get('http://localhost:5000/news/headlines');
            setHeadlines(response.data);
        } catch (error) {
            console.error('Error fetching headlines:', error);
        }
    }
    
    useEffect(() => {
        fetchHeadlines();
        if(location?.state?.login==true)
         {
        toast.error("please login")
          }
    }, []);


    function handleInput(source) {
        localStorage.setItem('source', source);
        localStorage.setItem('headlines', JSON.stringify(headlines));
        navigate('/detail');

    }

    return (
        <>
            <ToastContainer/>
            <Navbar />
            <div>
                <h1 className='d-flex justify-content-center' style={{fontFamily:"bernilsensfb",marginTop:"5rem"}}>Top Headlines</h1>
                <div>
                    <CardGroup>
                        {Object.keys(headlines).map((source) => (
                            <Card className="mt-5" style={{ backgroundColor: "rgb(225, 230, 255,0.2)" ,border:"none" }}>
                                <Card.Body>
                                    <Card.Title><img src={images[source]} style={{ width: "15%", borderRadius: "50px", fontFamily:"bernilsensfb" }} className='me-2' />{source}</Card.Title>
                                    <Card.Text>
                                        <div className='row'>
                                            {   Object.values(headlines[source]).slice(0, 3).map((headline, index) => (
                                                <li  key={index} className="mt-2">  {headline}</li>))
                                            }
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                                <div style={{marginBottom:"5%"}}>
                                        <button style={{ backgroundColor: "rgb(0,0,0,0)", border: "none", color: "red", fontWeight: "bold" }} type="submit" onClick={() => handleInput(source)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                                        </svg> Read More</button>
                                </div>
                            </Card>
                        ))}
                    </CardGroup>
                </div>
            </div>
        </>
    );
}

export default Home;
