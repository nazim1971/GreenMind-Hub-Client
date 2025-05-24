'use client';

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  MoreHorizontal,
  Eye,
  FileText,
  RefreshCw,
  Ban,
  CreditCard,
  Calendar,
  User,
  Hash,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITransaction } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';

export const columns: ColumnDef<ITransaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'transactionId',
    header: () => (
      <div className="flex items-center">
        <Hash className="mr-2 h-4 w-4" />
        Transaction ID
      </div>
    ),
    cell: ({ row }) => {
      const transactionId = row.getValue('transactionId') as string;
      return (
        <div className="font-medium text-sm truncate max-w-[150px]" title={transactionId}>
          {transactionId}
        </div>
      );
    },
  },
  {
    accessorKey: 'userEmail',
    header: () => (
      <div className="flex items-center">
        <User className="mr-2 h-4 w-4" />
        Customer
      </div>
    ),
    cell: ({ row }) => {
      const email = row.getValue('userEmail') as string;
      return (
        <div className="font-medium text-sm truncate max-w-[180px]" title={email}>
          {email}
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));
      const currency = row.original.gatewayResponse?.currency || 'USD';

      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
      }).format(amount);

      return (
        <div className="text-right font-medium">
          <Badge variant="outline" className="font-normal">
            {formatted}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;

      const statusVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        Paid: 'default',
        Pending: 'secondary',
        Failed: 'destructive',
      };

      return (
        <Badge variant={statusVariantMap[status] || 'outline'}>
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return Array.isArray(value) ? value.includes(row.getValue(id)) : false;
    },
  },
  {
    accessorKey: 'gatewayResponse.bank_gw',
    header: () => (
      <div className="flex items-center">
        <CreditCard className="mr-2 h-4 w-4" />
        Payment Method
      </div>
    ),
    cell: ({ row }) => {
      const paymentMethod = row.original.gatewayResponse?.bank_gw;
      const cardBrand = row.original.gatewayResponse?.card_brand;
      
      return (
        <div className="flex items-center">
          <span className="capitalize">{cardBrand || paymentMethod}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => (
      <div className="flex items-center">
        <Calendar className="mr-2 h-4 w-4" />
        Date
      </div>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className="text-sm">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(transaction.transactionId);
                  toast.success('Transaction ID copied to clipboard');
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Copy ID
              </DropdownMenuItem>
              
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              </DialogTrigger>

              <DropdownMenuSeparator />

              {transaction.status === 'Paid' && (
                <DropdownMenuItem>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Process Refund
                </DropdownMenuItem>
              )}

              {transaction.status === 'Pending' && (
                <DropdownMenuItem className="text-red-600">
                  <Ban className="mr-2 h-4 w-4" />
                  Cancel
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Transaction Details</DialogTitle>
              <DialogDescription>
                Transaction ID: {transaction.transactionId}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Customer</p>
                    <p className="text-sm">{transaction.userEmail}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                    <p className="text-sm">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <Badge variant={
                      transaction.status === 'Paid' ? 'default' :
                      transaction.status === 'Pending' ? 'secondary' : 'destructive'
                    }>
                      {transaction.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Amount</p>
                    <p className="text-sm font-medium">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: transaction.gatewayResponse?.currency || 'USD',
                      }).format(Number(transaction.amount))}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Method</p>
                    <p className="text-sm capitalize">
                      {transaction.gatewayResponse?.card_brand || transaction.gatewayResponse?.bank_gw}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Card Type</p>
                    <p className="text-sm capitalize">
                      {transaction.gatewayResponse?.card_type || '-'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Transaction Date</p>
                    <p className="text-sm">
                      {transaction.gatewayResponse?.tran_date || '-'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                    <p className="text-sm">
                      {transaction.gatewayResponse?.risk_title || '-'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

interface TransactionDataTableProps {
  data: ITransaction[];
}

export function TransactionDataTable({ data }: TransactionDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const isStatusFiltered = (status: string) => {
    const filterValue = table.getColumn('status')?.getFilterValue();
    return Array.isArray(filterValue) ? filterValue.includes(status) : false;
  };

  const toggleStatusFilter = (status: string) => {
    const currentFilter = (table.getColumn('status')?.getFilterValue() as string[] | undefined) || [];
    const newFilter = currentFilter.includes(status)
      ? currentFilter.filter(f => f !== status)
      : [...currentFilter, status];
    table.getColumn('status')?.setFilterValue(newFilter.length ? newFilter : undefined);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Filter transactions..."
            value={
              (table.getColumn('transactionId')?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn('transactionId')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Status
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                checked={isStatusFiltered('Paid')}
                onCheckedChange={() => toggleStatusFilter('Paid')}
              >
                Paid
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={isStatusFiltered('Pending')}
                onCheckedChange={() => toggleStatusFilter('Pending')}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={isStatusFiltered('Failed')}
                onCheckedChange={() => toggleStatusFilter('Failed')}
              >
                Failed
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={value => column.toggleVisibility(!!value)}
                >
                  {column.id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}