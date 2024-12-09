"use client";
import { Button } from "@/components/ui/button";
import { useConfetiState, useLoginState } from "@/context/login-state-provider";
import { useUser } from "@/context/user-provider";
import { fecherSupabase30Days } from "@/lib/fetcher-swr";
import { supabase } from "@/lib/supabase/client";
import { CheckIcon, LockIcon } from "lucide-react";
import { addDays, differenceInMilliseconds } from "date-fns";
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AgeVerificationDialog } from "@/containers/age-verification-dialog";
import { useRouter } from "next/navigation";
const ALERT_AUDIO = new Audio(
  "https://res.cloudinary.com/dfi9lz3xh/video/upload/v1733174896/Confetti_Pop_Sound_dingal.mp3"
);
const Reto30Dias = () => {
  const router = useRouter();
  const { user } = useUser();
  const { setValue } = useLoginState();
  const { setValue: setConfetti } = useConfetiState();
  const [openDayModal, setOpenDayModal] = React.useState<boolean | number>(
    false
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasVerified, setHasVerified] = React.useState(() => {
    if (typeof window !== 'undefined' && user) {
      return localStorage.getItem('age-verified') === 'true'
    }
    return true
  });

  React.useEffect(() => {
    if (user) {
      setHasVerified(localStorage.getItem('age-verified') === 'true');
    }
  }, [user]);

  const {
    data: dataDays,
    mutate: mutateDays,
    isLoading: isLoadingDays,
  } = useSWR(user?.id, fecherSupabase30Days);

  const days = dataDays?.["30_days"] ?? [];

  const insertNewDay = async () => {
    try {
      await supabase
        .from("profiles")
        .upsert({ id: user?.id, "30_days": [...days, new Date()] });
      await mutateDays();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };
  const confettiWithSound = () => {
    ALERT_AUDIO?.play();
    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 5000);
  };
  const handleStart30Days = async () => {
    setIsLoading(true);
    if (!user) {
      setValue(true);
      toast("Debes estar logueado para comenzar el reto de 30 dias.");
      setIsLoading(false);
      return;
    }
    toast.promise(
      insertNewDay().finally(() => {
        setIsLoading(false);
        confettiWithSound();
      }),
      {
        loading: "Cargando...",
        success: "Reto de 30 dias comenzado",
        error: (e) => `Error: ${e.message}`,
      }
    );
  };
  const handleNewDay = async () => {
    setIsLoading(true);

    toast.promise(
      insertNewDay()
        .then(() => confettiWithSound())
        .finally(() => setIsLoading(false)),
      {
        loading: "Cargando...",
        success: "Nuevo dia desbloqueado",
        error: (e) => `Error: ${e.message}`,
      }
    );
  };
  const daysLength = days.length;
  const lastDay = days.at(-1) ? new Date(days.at(-1)) : null;
  const [timeLeft, setTimeLeft] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!lastDay) return;
    
    setTimeLeft(differenceInMilliseconds(addDays(lastDay, 1), new Date()));
    
    const timer = setInterval(() => {
      const newTimeLeft = differenceInMilliseconds(addDays(lastDay, 1), new Date());
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [lastDay]);

  const isUnlocked = timeLeft !== null && timeLeft <= 0;
  const isButtonEnabled = timeLeft !== null && isUnlocked && !isLoading;

  const formatTimeLeft = (milliseconds: number) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleVerification = () => {
    localStorage.setItem('age-verified', 'true');
    setHasVerified(true);
  };

  const handleReject = () => {
    toast.error("Debes aceptar los términos para acceder al contenido");
    router.push("/");
  };

  if (user && !hasVerified) {
    return <AgeVerificationDialog 
      open={true} 
      onConfirm={handleVerification}
      onReject={handleReject}
      onClose={handleReject}
    />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-4xl">
        ¡Agranda tu pene en{" "}
        <span className="font-semibold italic">30 dias</span>!
      </h1>
      <p className="p-4 text-center">
        Alarga tu pene con estos ejercicios que te ayudarán a tener un pene más
        grande y fuerte.
      </p>
      <section className="grid place-items-center my-4">
        {isLoadingDays ? (
          <Skeleton className="h-9 w-60" />
        ) : (
          <>
            {daysLength === 0 ? (
              <Button
                disabled={isLoading}
                onClick={handleStart30Days}
                className="rounded-full"
              >
                <p>
                  ¡Click aqui para comenzar a agrandar <span>HOY</span>!
                </p>
              </Button>
            ) : (
              <Button
                disabled={!isButtonEnabled}
                onClick={handleNewDay}
                className={`rounded-full ${isUnlocked ? "" : "bg-black"}`}
              >
                {isUnlocked ? (
                  <p>¡Desbloquear siguiente dia!</p>
                ) : (
                  <p>
                    Tiempo restante para desbloquear:{" "}
                    {timeLeft === null ? "Cargando..." : formatTimeLeft(timeLeft)}
                  </p>
                )}
              </Button>
            )}
          </>
        )}
      </section>
      <section className="grid grid-cols-5 gap-4">
        {isLoadingDays
          ? Array(30)
              .fill("")
              .map((_, index) => (
                <Skeleton
                  key={index}
                  className="size-full aspect-square bg-secondary"
                />
              ))
          : Array(30)
              .fill("")
              .map((_, index) => {
                const isAvaible = daysLength > index;
                return (
                  <section
                    key={index}
                    className={`size-full aspect-square bg-gray-400 rounded flex justify-center items-center flex-col ${
                      isAvaible
                        ? "bg-green-400 cursor-pointer"
                        : "cursor-not-allowed"
                    }`}
                    onClick={() =>
                      isAvaible ? setOpenDayModal(index + 1) : null
                    }
                  >
                    <section className="rounded-full p-2 bg-black/20">
                      {isAvaible ? (
                        <CheckIcon size={18} />
                      ) : (
                        <LockIcon size={18} />
                      )}
                    </section>
                    <span className="text-white font-semibold italic">
                      Dia {index + 1}
                    </span>
                  </section>
                );
              })}
      </section>
      <Dialog open={Boolean(openDayModal)} onOpenChange={setOpenDayModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dia {openDayModal}</DialogTitle>
            <DialogDescription>
              Sigue la rutina diaria para obtener los mejores resultados!
            </DialogDescription>
          </DialogHeader>
          <section>
            {/* <img src={getCyclicVideo(Number(openDayModal))} alt="" /> */}
            <video
              className="size-full"
              src={getCyclicVideo(Number(openDayModal))}
              controls
              // autoPlay
            />
          </section>
          <DialogFooter>
            <Button type="submit">Volver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reto30Dias;

const VIDEOS = {
  ULI3: process.env.NEXT_PUBLIC_VIDEO_ULI3,
  INVERTED_V_STRETCH: process.env.NEXT_PUBLIC_VIDEO_INVERTED_V_STRETCH,
  JAI_STRETCH: process.env.NEXT_PUBLIC_VIDEO_JAI_STRETCH,
  AIDED_V_STRETCH: process.env.NEXT_PUBLIC_VIDEO_AIDED_V_STRETCH,
  DRY_JELQ: process.env.NEXT_PUBLIC_VIDEO_DRY_JELQ,
  WET_JELQ: process.env.NEXT_PUBLIC_VIDEO_WET_JELQ,
  SIMPLE_STRETCHES: process.env.NEXT_PUBLIC_VIDEO_SIMPLE_STRETCHES,
  SADSAK_SLINKY: process.env.NEXT_PUBLIC_VIDEO_SADSAK_SLINKY,
};

const videoArray = Object.values(VIDEOS);

function getCyclicVideo(index: number) {
  const cyclicIndex = (index - 1) % videoArray.length; // Ajustar para que inicie en 1
  return videoArray[cyclicIndex];
}
