"use server";

import { ApiResponse, ErrorResponse, Travel } from "@/types";
import { createAdminClient } from "../appwrite";
import { getLoggedInUser } from "./user.actions";
import { isErrorResponse } from "../utils";
import { ID, Query } from "node-appwrite";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_TRAVEL_COLLECTION_ID: TRAVEL_COLLECTION_ID,
} = process.env;

const checkConfig = (): ErrorResponse | null => {
    if (!DATABASE_ID || !TRAVEL_COLLECTION_ID) {
        return {
            error: "Configuration de la base de données manquante",
            status: 500
        };
    }
    return null;
};

export const getTravels = async ():Promise<ApiResponse<Travel[]>> => {
    const configError = checkConfig();
    if (configError) return configError;

    try {
        const { database } = await createAdminClient();
        const user = await getLoggedInUser();

        if (isErrorResponse(user)) {
            return user;
        }

        const travelDocs = await database.listDocuments(
            DATABASE_ID!,
            TRAVEL_COLLECTION_ID!,
            [Query.equal('userId', [user.data.userId])]
        );

        return {
            data: travelDocs.documents.map(doc => ({
                id: doc.$id,
                userId: doc.userId,
                destination: doc.destination,
                startDate: doc.startDate,
                endDate: doc.endDate
            })),
            status: 200
        };
    } catch (error) {
        return {
            error: "Oups! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const createTravel = async (travel: Omit<Travel, 'id' | 'userId'>): Promise<ApiResponse<Travel>> => {
    const configError = checkConfig();
    if (configError) return configError;

    const { destination, startDate, endDate } = travel;

    if (!destination) {
        return {
            error: "Vous devez spécifier la destination du voyage.",
            status: 400
        };
    }

    try {
        const { database } = await createAdminClient();
        const user = await getLoggedInUser();

        if (isErrorResponse(user)) {
            return user;
        }

        const newTravel = await database.createDocument(
            DATABASE_ID!,
            TRAVEL_COLLECTION_ID!,
            ID.unique(),
            {
                userId: user.data.userId,
                ...travel
            }
        );

        return {
            data: {
                id: newTravel.$id,
                userId: user.data.userId,
                destination,
                startDate,
                endDate
            },
            status: 201
        };
    } catch (error) {
        return {
            error: "Oups! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}

export const deleteTravel = async (travelId: string): Promise<ApiResponse<null>> => {
    const configError = checkConfig();
    if (configError) return configError;

    if (!travelId) {
        return {
            error: "L'identifiant du voyage n'est pas spécifié.",
            status: 400
        }
    }

    try {
        const { database } = await createAdminClient();
        const user = await getLoggedInUser();

        if (isErrorResponse(user)) {
            return user;
        }

        await database.deleteDocument(
            DATABASE_ID!,
            TRAVEL_COLLECTION_ID!,
            travelId
        );

        return {
            data: null,
            status: 200
        };
    } catch (error) {
        return {
            error: "Oups! Quelque chose s'est mal passé. Veuillez réessayer dans quelques instants.",
            status: 500
        };
    }
}