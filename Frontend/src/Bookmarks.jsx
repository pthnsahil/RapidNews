import react, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import html2canvas from 'html2canvas'
import jspdf from 'jspdf'
import "jspdf/dist/polyfills.es.js";
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-bootstrap'

function Bookmarks() {
    const email = localStorage.getItem('email');
    const [bookmarks, setBookmarks] = useState({})
    const [count,setCount]=useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('temp'));
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            fetch();

        } else {
            toast.error("please login");
            navigate('/', { state: { login: true } });

        }
    }, [])

    function fetch() {
        axios.post('http://localhost:5000/news/fetch', { email })
            .then((res) => { console.log(res.data.bookmarked); setBookmarks(res.data.bookmarked) })
            .catch((err) => console.log(err))

    }
    function handleDelete(item, index) {
        console.log(bookmarks[item][index])
        axios.post('http://localhost:5000/news/delete', { item, index, bookmarks, email })
            .then((res) => { console.log(res.data); fetch(); })
            .catch((err) => console.log(err))
    }

    function handleButton(item, index) {

        let v = document.getElementById(item + index);
        if (v.style.display == "none") {
            v.style.display = "block";
        } else {
            v.style.display = "none";
        }
    }
    function generateSS() {
        var input = document.getElementById('page')
        html2canvas(input, { logging: true, letterRendering: 1, useCORS: true }).then((canvas) => {
            const imgWidth = 210;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const imgData = canvas.toDataURL('img/png')
            const pdf = new jspdf('p', 'mm', 'a4')
            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
            pdf.save("sss.pdf")
        })

    }
    return (
        <>
            <ToastContainer />
            <Navbar />
            <div className='d-flex justify-content-end ' style={{marginTop:"5rem"}}>
                <button className='btn btn-danger me-3 ' onClick={generateSS}>Print</button>
            </div>
            <div className='mt-5 ' id="page" style={{ maxWidth: "50%", borderRadius: "50px", marginLeft: "25%", backgroundColor: "rgb(256,256,256,0.3)" }}>
            {  
                    Object.keys(bookmarks).map((item) => {
                        if (bookmarks[item].length > 0) {
                            return (
                                <div className='row mt-2' >
                                    <small className='d-flex justify-content-center' style={{ color: "#034f84" }}> <b>{item}</b></small>
                                    <div className='conatiner mb-2'>
                                        {bookmarks[item].map((i, index) => (
                                            <>
                                                <div className='row'>
                                                    <div className='col-10'>
                                                        <li style={{ margin: "1rem" }} onMouseUp={() => handleButton(item, index)}> {i}
                                                        </li></div>
                                                    <div className='col-2'>
                                                        <button type='submit' id={item + index} onClick={() => handleDelete(item, index)} style={{ display: "none", marginTop: "1rem", border: "none", color: "brown", backgroundColor: "rgb(256,256,256,0)" }}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                        </svg></button>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    })
                
                }
                   
                
            </div>
        </>
    )

}

export default Bookmarks;