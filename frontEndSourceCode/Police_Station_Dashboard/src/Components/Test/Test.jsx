import React from 'react'
import { useNavigate } from 'react-router-dom'

const Test = () => {
    const navigate = useNavigate();
    return (
        <>

            <div>Test</div>
            <button onClick={() => navigate(`/`)}>
                Click to Home
            </button >
        </>
    )
}

export default Test