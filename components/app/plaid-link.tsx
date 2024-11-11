"use client";

import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link'
import { PlaidLinkProps } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const PlaidLink = ({ user }: PlaidLinkProps) => {
    const router = useRouter();
    const [token, setToken] = useState("");

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);
            setToken(data?.linkToken);
        }

        getLinkToken();
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        });

        toast({
            title: "Compte bancaire ajouté !",
            description: "Votre compte bancaire a été ajouté avec succès."
        });
        router.refresh();
    }, [user]);

    const config: PlaidLinkOptions = {
        token,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <Button
            onClick={() => open()}
            disabled={!ready}
            className="z-10"
        >
            Ajoutez un compte bancaire
        </Button>
    );
}

export default PlaidLink;