import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet/sheet";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

type SheetComponentProps = {
  isOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
};

export function SheetComponent(props: SheetComponentProps) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Utiliza o useEffect para atualizar o token quando o usuário muda
  useEffect(() => {
    if (user) {
      setToken(user.token);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    try {
      console.log(`token: ${token}`);

      const response = await fetch("http://localhost:3333/edit-profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Perfil atualizado com sucesso!");
        setErrorMessage(null);
        console.log(data); // Exibe a resposta do backend
      } else {
        setSuccessMessage(null);
        setErrorMessage("Erro ao atualizar o perfil");
        console.error("Erro ao atualizar o perfil");
      }
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage("Erro ao comunicar com o servidor");
      console.error("Erro ao comunicar com o servidor", error);
    }
  };

  return (
    <Sheet open={props.isOpen} onOpenChange={props.onSheetOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          {/* <SheetClose asChild> */}
            <Button type="submit" onClick={handleSaveChanges}>
              Save changes
            </Button>
          {/* </SheetClose> */}
        </SheetFooter>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </SheetContent>
    </Sheet>
  );
}
