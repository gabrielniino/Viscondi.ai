import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api } from "@/lib/axios";
import { DataTable } from './data-table-history'; // Mantido
import { columns, HistoryUserVideo } from './columnsHistory'; // Mantido
import { Header } from '../../components/ui/Header';

export function HistoryPage() {
    const { user } = useAuth();
    const [histories, setHistories] = useState<HistoryUserVideo[]>([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        if (user) {
            setToken(user.token);
        }
    }, [user]);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
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
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();

    }, [token]);

    return (
        <>
            <Header />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataTable columns={columns} data={histories} />
            )}

        </>
    );
}
