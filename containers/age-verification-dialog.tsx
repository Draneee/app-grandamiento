"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import Link from "next/link";

export function AgeVerificationDialog({
  open,
  onConfirm,
  onReject,
  onClose,
}: {
  open: boolean;
  onConfirm: () => void;
  onReject: () => void;
  onClose: () => void;
}) {
  const [accepted, setAccepted] = React.useState({
    age: false,
    // terms: false,
    explicit: false,
  });

  const canContinue = Object.values(accepted).every(Boolean);

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Verificación de Edad</DialogTitle>
          <DialogDescription>
            Este sitio contiene material sensible relacionado con la salud sexual masculina.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="age"
              checked={accepted.age}
              onCheckedChange={(checked) =>
                setAccepted(prev => ({ ...prev, age: checked as boolean }))
              }
            />
            <label htmlFor="age" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Confirmo que soy mayor de 18 años
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="explicit"
              checked={accepted.explicit}
              onCheckedChange={(checked) =>
                setAccepted(prev => ({ ...prev, explicit: checked as boolean }))
              }
            />
            <label htmlFor="explicit" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Entiendo que este sitio contiene material sensible con fines educativos
            </label>
          </div>

          {/* <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={accepted.terms}
              onCheckedChange={(checked) =>
                setAccepted(prev => ({ ...prev, terms: checked as boolean }))
              }
            />
            <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Acepto los <Link href="/terminos" className="text-primary hover:underline">Términos y Condiciones</Link>
            </label>
          </div> */}
        </div>

        <DialogFooter>
          <Button 
            variant="destructive" 
            onClick={onReject}
            className="w-full"
            >
              Rechazar
            </Button>
          <Button 
            onClick={onConfirm} 
            disabled={!canContinue}
            className="w-full"
          >
            Confirmar y Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}