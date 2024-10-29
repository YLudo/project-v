"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/actions/user.actions";
import { loginFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const FormSchema = loginFormSchema();
    type FormData = z.infer<typeof FormSchema>;

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        try {
            const response = await signIn(data);
            if (response) router.push("/");
        } catch (error) {
            console.error("Error when signin in:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                <Input type="password" placeholder="Entrez votre adresse e-mail" {...field} />         
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
                    ) : "Se connecter"}
                </Button>
                <p className="text-sm text-center">Vous n'avez pas de compte ? <Link href="/register" className="text-primary">S'inscrire</Link></p>
            </form>
        </Form>
    );
}

export default LoginForm;