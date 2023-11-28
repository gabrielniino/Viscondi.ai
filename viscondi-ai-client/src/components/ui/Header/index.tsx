import { DropdownMenuComponent } from '@/components/ui/DropdownMenu';
import { SheetComponent } from "@/components/ui/Sheet";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { SheetComponentHistory } from '../../../pages/HystoryPage/historyPage';


export function Header() {
    const [isSheetOpen, setSheetOpen] = useState(false);
    const [isSheetHistoryOpen, setSheetHistoryOpen] = useState(false);

    const { logout } = useAuth();


    const onEditProfile = () => {
        setSheetOpen(true);
    }


    const onHistory = () => {
        setSheetHistoryOpen(true)
    }


    const onSheetOpenChange = (open: boolean) => {
        setSheetOpen(open);
    }

    const onLogout = () => {
        logout();
    }

    const onSheetOpenChangeHistory = (open: boolean) => {
        setSheetHistoryOpen(open);
    }


    return (
        <div className="px-6 py-3 flex items-center justify-between border-b">
            <h1 className="text-xl font-bold">Viscondi.ai</h1>
            <DropdownMenuComponent onEditProfile={onEditProfile} onLogout={onLogout} onHistory={onHistory} />
            <SheetComponent isOpen={isSheetOpen} onSheetOpenChange={onSheetOpenChange} />
            <SheetComponentHistory isOpen={isSheetHistoryOpen} onSheetOpenChange={onSheetOpenChangeHistory} />
        </div>
    );
}


