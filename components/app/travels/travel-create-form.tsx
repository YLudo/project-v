"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { createTravel } from "@/lib/actions/travel.actions";
import { travelCreateSchema } from "@/lib/schemas";
import { cn, formatDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const TravelCreateForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const FormSchema = travelCreateSchema();
    type FormData = z.infer<typeof FormSchema>;

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            destination: "",
            dateRange: {
                from: undefined,
                to: undefined
            }
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);

        const { destination, dateRange } = data;
        const travelData = {
            destination,
            startDate: dateRange.from ? dateRange.from.toISOString() : undefined,
            endDate: dateRange.to ? dateRange.to.toISOString() : undefined,
        };

        const response = await createTravel(travelData);

        if ('error' in response) {
            toast({
                variant: "destructive",
                title: "Création du voyage échouée !",
                description: response.error
            });
        } else {
            toast({
                title: "Création du voyage réussie !",
                description: "Votre voyage a été créé avec succès."
            });
            router.push("/travels");
            router.refresh();
        }

        setIsLoading(false);
    }

    return (
        <Card className="mt-6 max-w-md">
            <CardHeader>
                <CardTitle>Informations du voyage</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="destination"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Destination</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entrez votre destination" disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Période du voyage</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "pl-3 text-left font-normal w-full",
                                                        !field.value?.from &&
                                                            !field.value?.to &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value?.from ? (
                                                        field.value.to ? (
                                                            <>
                                                                {format(
                                                                    field.value.from,
                                                                    "PPP",
                                                                    { locale: fr }
                                                                )}{" "}
                                                                -{" "}
                                                                {format(
                                                                    field.value.to,
                                                                    "PPP",
                                                                    { locale: fr }
                                                                )}
                                                            </>
                                                        ) : (
                                                            format(
                                                                field.value.from,
                                                                "PPP",
                                                                { locale: fr }
                                                            )
                                                        )
                                                    ) : (
                                                        <span>Choisissez une période</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0"
                                            align="start"
                                        >
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date()
                                                }
                                                numberOfMonths={2}
                                            />
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    field.onChange({
                                                        from: undefined,
                                                        to: undefined,
                                                    })
                                                }
                                                className="mt-2"
                                            >
                                                Effacer les dates
                                            </Button>
                                        </PopoverContent>
                                    </Popover>
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
                            ) : "Créer votre voyage"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default TravelCreateForm;