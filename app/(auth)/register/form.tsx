"use client";

import { registerFormSchema } from "@/lib/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/actions/user.actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const FormSchema = registerFormSchema();
    type FormData = z.infer<typeof FormSchema>;

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        try {
            await signUp(data);
            router.push("/");
        } catch (error) {
            console.error('Error when signin up:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom d'utilisateur</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez votre nom d'utilisateur" {...field} />         
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse e-mail</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez votre adresse e-mail" {...field} />         
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Entrez votre mot de passe" {...field} />         
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    {isLoading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" /> &nbsp;
                            Chargement...
                        </>
                    ) : "S'inscrire"}
                </Button>
                <p className="text-sm text-center">Vous avez déjà un compte ? <Link href="/login" className="text-primary">Se connecter</Link></p>
            </form>
        </Form>
    );
}

export default RegisterForm;