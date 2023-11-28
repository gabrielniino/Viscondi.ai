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
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

type SheetComponentProps = {
  isOpen: boolean;
  onSheetOpenChange: (open: boolean) => void;
};

export function SheetComponent(props: SheetComponentProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSaveChanges = async () => {

    const { user } = useAuth();
    const token = user.getToken();

    try {
      const response = await fetch("http://localhost:3333/edit-profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, name, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Exibe a resposta do backend
      } else {
        console.error("Erro ao atualizar o perfil");
      }
    } catch (error) {
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
          <SheetClose asChild>
            <Button type="submit" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
