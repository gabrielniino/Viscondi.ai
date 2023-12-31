import { DropdownMenuComponent } from '@/components/ui/DropdownMenu';
import { SheetComponent } from "@/components/ui/Sheet";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



export function Header() {
    const navigate = useNavigate();
    const [isSheetOpen, setSheetOpen] = useState(false);

    const { logout } = useAuth();


    const onEditProfile = () => {
        setSheetOpen(true);
    }

    const onSheetOpenChange = (open: boolean) => {
        setSheetOpen(open);
    }

    const onLogout = () => {
        logout();
    }

    const onHistory = () => {

        navigate('/history');
    }


    return (
        <div className="px-6 py-3 flex items-center justify-between border-b">
            <h1 className="text-xl font-bold">Viscondi.ai</h1>
            <DropdownMenuComponent onEditProfile={onEditProfile} onLogout={onLogout} onHistory={onHistory} />
            <SheetComponent isOpen={isSheetOpen} onSheetOpenChange={onSheetOpenChange} />
        </div>
    );
}


