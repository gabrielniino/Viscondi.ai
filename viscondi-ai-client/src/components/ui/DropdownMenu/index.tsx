import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/dropdown-menu"
import { Github, HelpCircle } from "lucide-react"

type DropdownMenuComponentProps = {
    onEditProfile: () => void;
    onLogout: () => void;
    onHistory: () => void;

}

export function DropdownMenuComponent(props: DropdownMenuComponentProps) {
    const openGitHubRepo = () => {
        window.open("https://github.com/gabrielniino/Viscondi.ai", "_blank");
      }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Perfil</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={props.onEditProfile}>
                        Editar Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={props.onHistory}>
                        Histórico
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={openGitHubRepo}><Github className="w-4 h-4 mr-2" />GitHub</DropdownMenuItem>
                {/* <DropdownMenuItem><HelpCircle className="w-4 h-4 mr-2" /> Suporte</DropdownMenuItem> */}
                <DropdownMenuItem disabled>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={props.onLogout}>
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
