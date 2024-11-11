"use client";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { TransactionPaginationProps } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const TransactionPagination = ({ page, totalPages }: TransactionPaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams()!;

    const handleNavigation = (type: "prev" | "next") => {
        const pageNumber = type === "prev" ? page - 1 : page + 1;

        const newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: "page",
            value: pageNumber.toString(),
        });

        router.push(newUrl, { scroll: false });
    };

    return (
        <div className="w-full flex justify-between items-center gap-3">
            <Button
                size="lg"
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={() => handleNavigation("prev")}
                disabled={Number(page) <= 1}
            >
                <ArrowLeft width={20} height={20} className="mr-2" />
                Précédent
            </Button>
            <p className="text-sm flex items-center px-2">
                {page} / {totalPages}
            </p>
            <Button
                size="lg"
                variant="ghost"
                className="p-0 hover:bg-transparent"
                onClick={() => handleNavigation("next")}
                disabled={Number(page) >= totalPages}
            >
                <ArrowRight width={20} height={20} className="mr-2" />
                Suivant
            </Button>
        </div>
    );
};

export default TransactionPagination;