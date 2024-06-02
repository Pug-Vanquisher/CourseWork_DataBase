import axios from 'axios';

const API_URL = 'https://localhost:7009/api/Account';

interface AuthResponse {
    message: string;
    role?: string;
    userId?: string; // Добавляем userId
}

export const register = async (login: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/Register`, { login, password });
    return response.data;
};

export const login = async (login: string, password: string): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/Login`, { login, password });
    return response.data;
};
