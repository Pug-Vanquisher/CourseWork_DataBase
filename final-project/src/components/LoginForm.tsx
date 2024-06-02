import React, { useState } from 'react';
import { login } from '../api/auth';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const LoginForm: React.FC = () => {
    const [loginValue, setLoginValue] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await login(loginValue, password);
            console.log('Login response:', response); // Логируем ответ сервера для проверки
            if (response.userId) {
                localStorage.setItem('userId', response.userId.toString());
            }
            localStorage.setItem('userRole', response.role || '');
            if (response.role === 'admin') {
                navigate('/items');
            } else {
                navigate('/user-items');
            }
            setNotification({ open: true, message: `Logged in as ${response.role}`, severity: 'success' });
        } catch (err) {
            console.error('Login error:', err);
            setNotification({ open: true, message: 'Invalid login or password', severity: 'error' });
        }
    };

    const handleNotificationClose = () => {
        setNotification({ ...notification, open: false });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Login"
                    name="login"
                    value={loginValue}
                    onChange={(e) => setLoginValue(e.target.value)}
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
                    Login
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

export default LoginForm;
