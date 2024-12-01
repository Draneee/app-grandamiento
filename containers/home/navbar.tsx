"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [defaultTab, setDefaultTab] = React.useState<
    "login" | "register" | string
  >("register");

  // Formulario de login
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Formulario de registro
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log("Login values:", values);
    const { email, password } = values;
    setIsLoading(true);
    supabase.auth.signInWithPassword({ email, password }).then((response) => {
      if (response.error) {
        console.error("Error en el login:", response.error.message);
        toast.error(response.error.message);
      } else {
        console.log("Usuario logueado con éxito");
      }
      setIsLoading(false);
    });
  };

  const handleRegisterSubmit = async (
    values: z.infer<typeof registerSchema>
  ) => {
    console.log("Register values:", values);
    setIsLoading(true);
    const { email, password, username } = values;
    console.log(username);

    try {
      console.log(`or query =>`, `username.eq.${username},email.eq.${email}`);
      const {
        data,
        // error: errorUser
      } = await supabase
        .from("profiles")
        .select("*")
        .or(`username.eq.${username},email.eq.${email}`)
        .single(); // Esto asegura que solo se devuelve un resultado, si hay coincidencias

      console.log("data =>", data);

      if (data) {
        if (data.email === email) {
          toast.error("El correo ya está en uso, elige otro.");
          return;
        }
        if (data.username === username)
          toast.error("El nombre de usuario ya está en uso, elige otro.");
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: username },
        },
      });

      if (error) {
        throw error;
      } else {
        console.log("Usuario registrado con éxito");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Error en el registro:", e.message);
      } else {
        console.error("Error en el registro:", e);
      }
    } finally {
      setIsLoading(false);
    }
  };
  console.log("hi");
  return (
    <>
      <nav className="absolute w-full top-0 container flex justify-between py-4 mx-auto max-md:px-2">
        <section className="grid place-items-center">
          <p className="text-xl font-normal text-center">
            APP
            <span className="italic font-semibold font-mono">GRANDAMIENTO</span>
          </p>
        </section>
        <section className="flex gap-2">
          <Button
            onClick={() => {
              setIsMenuOpen(true);
              setDefaultTab("login");
            }}
            className="rounded-full"
            variant={"outline"}
          >
            Inicia sesión
          </Button>
          <Button
            className="rounded-full"
            onClick={() => {
              setDefaultTab("register");
              setIsMenuOpen(true);
            }}
          >
            Registro
          </Button>
        </section>
      </nav>
      <Dialog
        open={isMenuOpen}
        onOpenChange={(p) => {
          if (isLoading) return;
          setIsMenuOpen(p);
          if (!p) {
            loginForm.reset();
            registerForm.reset();
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px] p-0">
          <Tabs
            defaultValue="login"
            className=""
            value={defaultTab}
            aria-disabled={isLoading}
            onValueChange={setDefaultTab}
          >
            <TabsList className="w-full grid grid-cols-2 -mt-[45px]">
              <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
              <TabsTrigger value="register">Registro</TabsTrigger>
            </TabsList>
            <TabsContent className="p-6" value="login">
              <DialogHeader>
                <DialogTitle>Iniciar sesión</DialogTitle>
                <DialogDescription>
                  Accede a tu cuenta con tus credenciales.
                </DialogDescription>
              </DialogHeader>
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                  className="space-y-4 mt-2"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@domain.co" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    Iniciar sesión
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent className="p-6" value="register">
              <DialogHeader>
                <DialogTitle>Registro</DialogTitle>
                <DialogDescription>
                  Regístrate para acceder a todas las funciones.
                </DialogDescription>
              </DialogHeader>
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                  className="space-y-4 mt-2"
                >
                  <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre de usuario" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@domain.co" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    Registrarse
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
// Schema para login
const loginSchema = z.object({
  email: z.string().email({ message: "Introduce un correo válido" }).min(1),
  password: z.string().min(8, { message: "Debe tener al menos 8 caracteres" }),
});

// Schema para registro
const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Debe tener al menos 3 caracteres" }),
    email: z.string().email({ message: "Introduce un correo válido" }).min(1),
    password: z
      .string()
      .min(8, { message: "Debe tener al menos 8 caracteres" }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Apunta al campo con error
  });
