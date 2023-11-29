import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { DataTable } from './data-table-history';
import { api } from "@/lib/axios";
import { columns, HistoryUserVideo } from './columnsHystory';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '../../components/ui/Sheet/sheet';
import { Button } from '../../components/ui/button';

type HistorySheetProps = {
    isOpen: boolean;
    onSheetOpenChange: (open: boolean) => void;
};

export function SheetComponentHistory(props: HistorySheetProps) {
    const [histories, setHistories] = useState<HistoryUserVideo[]>([]);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const navigate = useNavigate();
    const token = user?.token;

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
                navigate('/login');
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleSheetClose = () => {
        props.onSheetOpenChange(false);
    };

    return (

        <Sheet open={props.isOpen} onOpenChange={handleSheetClose}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Histórico</SheetTitle>
                    <SheetDescription>
                        Veja o histórico de suas transcrições aqui.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <DataTable columns={columns} data={histories} />
                    )}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={handleSheetClose}>Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
