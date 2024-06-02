import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const RegisterPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await axios.post('https://localhost:7009/api/Account/Register', { login, password });
            setNotification({ open: true, message: 'User registered successfully', severity: 'success' });
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error);
            setNotification({ open: true, message: 'Error registering user', severity: 'error' });
        }
    };

    const handleNotificationClose = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <Container component="main" maxWidth="xs">
             <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Login"
                    name="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Register
                </Button>
                <Notification
                    open={notification.open}
                    message={notification.message}
                    severity={notification.severity}
                    onClose={handleNotificationClose}
                />
            </Box>
        </Container>
    );
};

export default RegisterPage;
