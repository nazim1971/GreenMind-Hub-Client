/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Trash2,
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
import Image from 'next/image';
import { TIdea } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteIdea } from '../_actions';
import { toast } from 'sonner';
import { useState } from 'react';
import IdeaStatusModal from './IdeaStatusModel';
import { DeleteConfirmationModal } from './DeleteModel';

interface DataTableProps {
  data: TIdea[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();

  const handleDeleteClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedIdeaId) return;
    try {
      await deleteIdea(selectedIdeaId);
      toast.success('Idea deleted successfully');
      setOpenDeleteModal(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete idea');
    }
  };

  const columns: ColumnDef<TIdea>[] = [
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
      accessorKey: 'title',
      header: 'Project',
      cell: ({ row }) => {
        const title = row.getValue('title') as string;
        const words = title.split(' ');
        const shortTitle = words.length > 2 
          ? `${words[0]} ${words[1]}...` 
          : title;
          
        return (
          <div className="font-medium flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image
                src={row.original.images?.[0] || '/placeholder.svg'}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium" title={title}>{shortTitle}</div>
              <div className="text-xs text-muted-foreground">
                {row.original.category?.name}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        const id = row.original.id;

        const statusColorMap: Record<string, string> = {
          UNDER_REVIEW: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80',
          APPROVED: 'bg-green-100 text-green-800 hover:bg-green-100/80',
          REJECTED: 'bg-red-100 text-red-800 hover:bg-red-100/80',
          DRAFT: 'bg-blue-100 text-blue-800 hover:bg-blue-100/80',
        };

        return (
          <Badge
            className={`${
              statusColorMap[status] || 'bg-gray-100 text-gray-800'
            } font-medium`}
            variant="outline"
          >
            {status === 'UNDER_REVIEW' ? (
              <IdeaStatusModal title={status?.replace(/_/g, ' ')} id={id} />
            ) : (
              status.replace(/_/g, ' ')
            )}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.original.status);
      },
    },
    {
      id: 'author',
      accessorFn: (row) => row.author?.name,
      header: 'Author',
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.author?.name}</div>;
      },
    },
    {
      id: 'price',
      accessorFn: (row) => row.isPaid ? row.price : 'Free',
      header: 'Price',
      cell: ({ row }) => {
        const isPaid = row.original.isPaid;
        const price = row.original.price;

        if (!isPaid) return <div className="text-center">Free</div>;

        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;
        const isDeleted = row.original.isDeleted;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(project.id);
                  toast.success('Idea ID copied to clipboard');
                }}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/idea/${project?.id}`} className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </Link>
              </DropdownMenuItem>
              {!isDeleted && (
                <DropdownMenuItem
                  onClick={() => handleDeleteClick(project.id)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data || [],
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

  const statusOptions = [
    { label: 'Under Review', value: 'UNDER_REVIEW' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Draft', value: 'DRAFT' },
  ];

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(prev => {
      const newFilter = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];

      table
        .getColumn('status')
        ?.setFilterValue(newFilter?.length ? newFilter : undefined);
      return newFilter;
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-4 py-4 lg:flex-row md:items-center">
        <Input
          placeholder="Search projects..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {statusOptions.map(option => (
            <Badge
              key={option.value}
              variant={
                statusFilter.includes(option.value) ? 'default' : 'outline'
              }
              className="cursor-pointer"
              onClick={() => handleStatusFilterChange(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No projects found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex gap-2">
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

      <DeleteConfirmationModal
        open={openDeleteModal}
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}