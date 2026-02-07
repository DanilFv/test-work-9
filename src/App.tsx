import './App.css';
import NavBar from './components/NavBar/NavBar.tsx';
import {Container, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import CategoriesPage from './containers/CategoriesPage/CategoriesPage.tsx';
import {useState} from 'react';
import Home from './containers/Home/Home.tsx';

const App = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

     const addModal = () => {
        setIsEdit(false);
        setModalOpen(true);
    };


  return (
    <>
        <NavBar onOpen={addModal} />
        <Container>
            <Routes>
                <Route
                    path="/"
                    element={<Home modalOpen={modalOpen} setModalOpen={setModalOpen} isEdit={isEdit} setIsEdit={setIsEdit} />}
                />
                <Route path="/categories" element={(<CategoriesPage />)} />

                <Route path='*' element={(<Typography component='p' variant='h4' sx={{textAlign: 'center', mt: 3, fontWeight: 'medium'}}>Not found page!</Typography>)} />
            </Routes>
        </Container>
    </>

  )
};

export default App
