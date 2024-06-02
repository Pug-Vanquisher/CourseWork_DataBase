import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, TextField, Box, Typography, Container } from '@mui/material';

interface LoginPageProps {
    onLogin: (role: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://localhost:7009/api/Account/Login', { login, password });
            const role = response.data.role;
            const userId = response.data.userId; // Получаем userId из ответа

            if (role && userId) {
                localStorage.setItem('userRole', role);
                localStorage.setItem('userId', userId); // Сохраняем userId в localStorage
                onLogin(role); // Вызываем onLogin с ролью пользователя
                if (role === 'admin') {
                    navigate('/items');
                } else if (role === 'user') {
                    navigate('/user-items');
                }
            } else {
                console.error('No role or userId received from the server');
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Вход
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogin}
                    >
                        Войти
                    </Button>
                    <Link to="/register">
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1 }}
                        >
                            Зарегистрироваться
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;
