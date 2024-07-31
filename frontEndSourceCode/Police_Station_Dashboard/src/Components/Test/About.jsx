import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Common/Navbar/Navbar';

const About = () => {
    const navigate = useNavigate();
    return (
    <div>
    <Navbar/>
        <div>About</div>
        <button onClick={() => navigate(`/about/test`)}>
            Click to Test
        </button >
    </div>
    )
}

export default About