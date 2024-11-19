"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileItem } from "@/types";
import { File, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const TravelFiles = () => {
    const [files, setFiles] = useState<FileItem[]>([
        { id: "1", name: "document.pdf", size: "2.5 MB" },
        { id: "2", name: "image.jpg", size: "3.7 MB" },
        { id: "3", name: "spreadsheet.xlsx", size: "1.2 MB" },
    ]);
    
    const totalStorage = 100;
    const usedStorage = files.reduce((total, file) => total + parseFloat(file.size), 0);
    const usedPercentage = (usedStorage / totalStorage) * 100;
    
    const handleDelete = (id: string) => {
        setFiles(files.filter(file => file.id !== id));
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">Fichiers du voyage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>{usedStorage.toFixed(1)} MB utilisé(s)</span>
                        <span>{totalStorage} MB total</span>
                    </div>
                    <Progress value={usedPercentage} className="h-2" />
                </div>
                <div className="space-y-2">
                {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center space-x-2">
                        <File className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{file.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{file.size}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDelete(file.id)}
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Supprimer le fichier</span>
                        </Button>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter des fichiers
                </Button>
            </CardFooter>
        </Card>
    );
}

export default TravelFiles;