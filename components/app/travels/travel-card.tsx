"use client";

import { TravelCardProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarDays, Edit, MapPin, MoreVertical, Trash } from "lucide-react";
import { calculateDuration, formatDate } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteTravel } from "@/lib/actions/travel.actions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const TravelCard = ({ id, destination, startDate, endDate }: TravelCardProps) => {
    const duration = calculateDuration(startDate!, endDate!);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleEditClick = () => {
        router.push(`/travels/edit/${id}`);
    }

    const handleDelete = async () => {
        const response = await deleteTravel(id);

        if ('error' in response) {
            toast({
                variant: "destructive",
                title: "Suppresion du voyage échoué !",
                description: response.error
            });
        } else {
            toast({
                title: "Suppression du voyage réussie !",
                description: "Votre voyage a été supprimé avec succès."
            });
            router.refresh();
        }
        setShowModal(false);
    }

    return (
        <>
            <Card className="w-full h-fit">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-xl font-bold flex items-center">
                        <MapPin className="w-6 h-6 mr-2 text-primary" />
                        {destination}
                    </CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Ouvrir le menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="hover:cursor-pointer" onClick={handleEditClick}>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Modifier</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500 focus:bg-red-500 focus:text-white hover:cursor-pointer" onClick={handleDeleteClick}>
                                <Trash className="mr-2 h-4 w-4" />
                                <span>Supprimer</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-2">
                        <CalendarDays className="w-5 h-5 mr-2 text-primary" />
                        <span className="text-sm font-medium text-gray-600">Dates de voyage</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        { startDate && endDate ? (
                            <>
                                <div className="text-lg font-semibold mb-1 sm:mb-0">{formatDate(startDate)}</div>
                                <ArrowRight className="hidden sm:block w-5 h-5 text-gray-400 mx-2" />
                                <div className="text-lg font-semibold mb-1 sm:mb-0">{formatDate(endDate)}</div>
                            </>
                        ): (
                            <p className="text-lg font-semibold">Non défini</p>
                        )}
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        Durée : {duration} jour{duration !== 1 ? "s" : ""} 
                    </div>
                </CardContent>
            </Card>
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                    </DialogHeader>
                    <p>
                        Êtes-vous sûr de vouloir supprimer ce voyage ? Cette action est
                        irréversible.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Supprimer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default TravelCard;