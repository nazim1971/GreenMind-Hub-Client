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
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
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
import { useRouter } from 'next/navigation';
import { deleteIdea } from '../_actions';
import { toast } from 'sonner';
import Link from 'next/link';
import { useState } from 'react';
import { DeleteConfirmationModal } from './DeleteModel';

interface DataTableProps {
  ideas: TIdea[];
}

export function MemberIdeaTable({ ideas }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    problemStatement: false,
    solution: false,
    description: false,
    feedback: false,
    updatedAt: false,
    isDeleted: false
  });
  const [rowSelection, setRowSelection] = useState({});
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [, setSelectedIdea] = useState<TIdea | null>(null);
  const router = useRouter();

  const handleDeleteClick = (ideaId: string) => {
    setSelectedIdeaId(ideaId);
    setOpenDeleteModal(true);
  };

  const handleEditClick = (ideaId: string) => {
    router.push(`/member/edit-idea/${ideaId}`);
  };

  const handleConfirmDelete = async () => {
    if (!selectedIdeaId) return;
    try {
      await deleteIdea(selectedIdeaId);
      toast.success('Idea deleted successfully');
      setOpenDeleteModal(false);
      setSelectedIdea(null);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete idea');
      setOpenDeleteModal(false);
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Project
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const title = row.getValue('title') as string;
        const images = row.original.images as string[];
        return (
          <div className="flex items-center gap-3 min-w-[200px]  ">
            <div className="relative h-10 w-10 overflow-hidden rounded-md shrink-0">
              <Image
                src={images?.[0] || '/placeholder.svg'}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
            <div className="font-medium" title={title}>
              {title.length > 30 ? `${title.substring(0, 30)}...` : title}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;

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
            {status.replace(/_/g, ' ')}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'category',
      accessorFn: row => row.category?.name,
      header: 'Category',
      cell: ({ row }) => {
        const categoryName = row.original.category?.name;
        return <div className="text-sm">{categoryName}</div>;
      },
    },
    {
      accessorKey: 'isPaid',
      header: 'Type',
      cell: ({ row }) => {
        const isPaid = row.getValue('isPaid') as boolean;
        return (
          <Badge variant={isPaid ? 'default' : 'outline'}>
            {isPaid ? 'Premium' : 'Free'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = Number.parseFloat(row.getValue('price'));
        const isPaid = row.getValue('isPaid') as boolean;

        if (!isPaid) return <div className="text-center">-</div>;

        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return <div className="text-sm">{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;
        const status = row.getValue('status') as string;

        return (
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
                  navigator.clipboard.writeText(project?.id);
                  toast.success('Idea ID copied');
                }}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/ideas/${project?.id}`} className="flex items-center w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  View details
                </Link>
              </DropdownMenuItem>
              {status !== 'APPROVED' && (
                <DropdownMenuItem onClick={() => handleEditClick(project.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => handleDeleteClick(project.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: ideas,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
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
        ?.setFilterValue(newFilter.length ? newFilter : undefined);
      return newFilter;
    });
  };

  return (
    <div className="w-full space-y-4 ">
      <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center ">
        <Input
          placeholder="Search your ideas..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex flex-wrap gap-2 ">
          {statusOptions.map(option => (
            <Badge
              key={option.value}
              variant={
                statusFilter.includes(option.value) ? 'default' : 'outline'
              }
              className="cursor-pointer  hover:bg-teal-100/80 hover:text-teal-800"
              onClick={() => handleStatusFilterChange(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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

      <div className="rounded-lg border bg-white dark:bg-gray-900 min-h-screen shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-900">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="py-3">
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
                  className="hover:bg-gray-800"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-3">
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
                  className="h-24 text-center py-8"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500">No ideas found</p>
                    <Button
                      variant="ghost"
                      className="text-teal-600"
                      onClick={() => {
                        table.resetColumnFilters();
                        table.resetSorting();
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center gap-4 py-4 sm:flex-row sm:justify-between">
        <div className="text-sm text-gray-500">
          Showing {table.getRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} ideas
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