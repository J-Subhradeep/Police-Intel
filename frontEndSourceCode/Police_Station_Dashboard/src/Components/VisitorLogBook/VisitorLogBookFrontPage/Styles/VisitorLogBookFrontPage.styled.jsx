import styled from '@emotion/styled'

export const VisitorLogBookFrontPageWrapper = styled.div`

.dashboard_main{
    height: calc(100vh - 5rem);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.dashboard_components {
    height: 10.5rem;
    width: 13.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
    transition: transform 0.3s ease-in-out; 
    background-color: #90caf9;
    cursor: pointer;
}

.dashboard_components:hover {
    transform: scale(1.1); 
}


.dashboard_image{
    height: 4.5rem;
    width: 4.5rem;
}

.button_container{
    display: flex;
    justify-content: flex-end;
    padding-right: 1rem;
    padding-top: 1rem;
}
`