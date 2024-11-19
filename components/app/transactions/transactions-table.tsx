import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatAmount, formatDate, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils"
import { Transaction, TransactionsTableProps } from "@/types"

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
    return (
        <Table>
            <TableHeader className="bg-secondary">
                <TableRow>
                    <TableHead className="px-2">Transaction</TableHead>
                    <TableHead className="px-2">Montant</TableHead>
                    <TableHead className="px-2">Status</TableHead>
                    <TableHead className="px-2">Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((t: Transaction) => {
                    const status = getTransactionStatus(new Date(t.date));
                    const amount = formatAmount(t.amount);
                    const isDebit = t.type === 'debit';
                    const isCredit = t.type === "credit";

                    return (
                        <TableRow key={t.id} className="!over:bg-none !border-b-DEFAULT">
                            <TableCell className="max-w-[250px] pl-2 pr-10">
                                <div className="flex items-center gap-3">
                                    <img src={t.image} className="w-8 rounded-full" />
                                    <h1 className="text-sm truncate font-semibold">
                                        {removeSpecialCharacters(t.name)}
                                    </h1>
                                </div>
                            </TableCell>
                            <TableCell className={`pl-2 pr-10 font-semibold ${
                                isDebit || amount[0] === "-" ? "text-[#F04438]" : "text-[#039855]" 
                            }`}>
                                {isDebit ? `-${amount}` : isCredit ? amount : amount}
                            </TableCell>
                            <TableCell className="pl-2 pr-10">
                                <Badge variant={status === "Validé" ? "default" : "secondary"}>{status}</Badge>
                            </TableCell>
                            <TableCell className="min-w-32 pl-2 pr-10">
                                {formatDate(t.date)}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

export default TransactionsTable;