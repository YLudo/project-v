import { z } from "zod";

export const registerFormSchema = () => z.object({
    username: z
        .string()
        .min(3, {
            message: "Votre nom d'utilisateur doit faire 3 caractères minimum."
        }),
    email: z
        .string()
        .email({
            message: "Vous devez renseigner une adresse e-mail valide."
        }),
    password: z
        .string()
        .min(8, {
            message: "Votre mot de passe doit faire 8 caractères minimum."
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/, {
            message: "Votre mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial."
        }),
});

export const loginFormSchema = () => z.object({
    email: z
        .string()
        .email({
            message: "Vous devez renseigner une adresse e-mail valide."
        }),
    password: z
        .string()
        .min(8, {
            message: "Votre mot de passe doit faire 8 caractères minimum."
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{8,}$/, {
            message: "Votre mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial."
        }),
});

export const travelCreateSchema = () => 
    z.object({
      destination: z.string().min(1, "Vous devez spécifier une destination."),
      dateRange: z
        .object({
          from: z.date().optional(),
          to: z.date().optional(),
        })
        .refine(
            (data) => (data.from && data.to) || (!data.from && !data.to),
            {
                message: "Vous devez sélectionner une date de début ET une date de fin."
            }
        )
        .refine(
            (data) => (!data.from && !data.to) || (data.from && data.to && data.to > data.from),
            {
                message: "La date de fin doit être supérieure à la date de début."
            }
        )
    });