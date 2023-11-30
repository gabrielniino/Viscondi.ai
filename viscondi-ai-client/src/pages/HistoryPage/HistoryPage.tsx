import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api } from "@/lib/axios";
import { DataTable } from './data-table-history';
import { columns, HistoryUserVideo } from './columnsHistory';
import { Header } from '../../components/ui/Header';
import { useNavigate } from 'react-router-dom';

export function HistoryPage() {
    const { user } = useAuth();
    const [histories, setHistories] = useState<HistoryUserVideo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token] = useState<string | null>(user?.token || null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                setError('Token não disponível.');
                return;
            }

            try {
                setLoading(true);
                const response = await api.get('/history', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setHistories(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Erro ao carregar dados.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    const handlePassVideo = (selectedVideo: HistoryUserVideo) => {
        console.log(`selectedVideo: ${JSON.stringify(selectedVideo)}`)
        navigate('/home', { state: { selectedVideo } });
    };

    return (
        <>
            <Header />
            {error ? (
                <p>Error: {error}</p>
            ) : loading ? (
                <p>Loading...</p>
            ) : (
                <DataTable columns={columns} data={histories} onRowClick={(row) => handlePassVideo(row)} />
            )}
        </>
    );
}
