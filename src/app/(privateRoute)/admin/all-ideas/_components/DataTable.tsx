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
  // Edit,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIdea, setSelectedIdea] = useState<TIdea | null>(null);
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
      setSelectedIdea(null);
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
      accessorKey: 'id',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const id = row.getValue('id') as string;
        return (
          <div className="font-mono text-xs max-w-[120px] truncate" title={id}>
            {id}
          </div>
        );
      },
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Project Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const title = row.getValue('title') as string;
        return (
          <div className="font-medium max-w-[200px] truncate" title={title}>
            {title}
          </div>
        );
      },
    },
    {
      accessorKey: 'problemStatement',
      header: 'Problem Statement',
      cell: ({ row }) => {
        const problemStatement = row.getValue('problemStatement') as string;
        return (
          <div className="max-w-[200px] truncate" title={problemStatement}>
            {problemStatement}
          </div>
        );
      },
    },
    {
      accessorKey: 'solution',
      header: 'Solution',
      cell: ({ row }) => {
        const solution = row.getValue('solution') as string;
        return (
          <div className="max-w-[200px] truncate" title={solution}>
            {solution}
          </div>
        );
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        const description = row.getValue('description') as string;
        return (
          <div className="max-w-[200px] truncate" title={description}>
            {description}
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const id = row?.getValue('id') as string;

        const statusColorMap: Record<string, string> = {
          UNDER_REVIEW: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80',
          APPROVED: 'bg-green-100 text-green-800 hover:bg-green-100/80',
          REJECTED: 'bg-red-100 text-red-800 hover:bg-red-100/80',
          DRAFT: 'bg-blue-100 text-blue-800 hover:bg-blue-100/80',
        };

        return (
          <Badge
            onClick={() => {}}
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
            {/* {status.replace(/_/g, " ")} */}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'isPaid',
      header: 'Type',
      cell: ({ row }) => {
        const isPaid = row.getValue('isPaid') as boolean;
        return (
          <Badge variant={isPaid ? 'default' : 'outline'}>
            {isPaid ? 'Paid' : 'Free'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-right"
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const price = Number.parseFloat(row.getValue('price'));
        const isPaid = row.getValue('isPaid') as boolean;

        if (!isPaid) return <div className="text-center">Free</div>;

        // Format the price as a dollar amount
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'feedback',
      header: 'Feedback',
      cell: ({ row }) => {
        const feedback = row.getValue('feedback') as string | null;
        return (
          <div className="max-w-[200px] truncate" title={feedback || ''}>
            {feedback || 'No feedback'}
          </div>
        );
      },
    },
    {
      id: 'category',
      accessorFn: row => row?.category?.name,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const categoryName = row?.original?.category?.name;
        return <div className="text-center">{categoryName}</div>;
      },
    },
    {
      id: 'author',
      accessorFn: row => row?.author?.name,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Author
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const authorName = row?.original?.author?.name;
        return <div className="text-center">{authorName}</div>;
      },
    },
    {
      accessorKey: 'isDeleted',
      header: 'Delete Status',
      cell: ({ row }) => {
        const isDeleted = row.getValue('isDeleted') as boolean;
        return (
          <Badge
            className="text-center"
            variant={isDeleted ? 'destructive' : 'outline'}
          >
            {isDeleted ? 'Deleted' : 'Active'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'images',
      header: 'Image',
      cell: ({ row }) => {
        const images = row.getValue('images') as string[];

        if (!images || images?.length === 0) {
          return (
            <div className="text-center text-muted-foreground">No image</div>
          );
        }

        return (
          <div className="flex justify-center">
            <div className="relative h-10 w-10 overflow-hidden rounded-md">
              <Image
                src={images[0] || '/placeholder.svg'}
                alt={row.getValue('title') as string}
                fill
                className="object-cover"
              />
            </div>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return <div className="text-center">{date.toLocaleDateString()}</div>;
      },
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue('updatedAt'));
        return <div className="text-center">{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original;
        const isDeleted = row.getValue('isDeleted') as boolean;

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
                  toast.success('Idea id copied to dashboard');
                }}
              >
                <span className="flex items-center">
                  <span className="mr-2">Copy ID</span>
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="flex items-center cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" />
                  <Link href={`/idea/${project?.id}`}>View details</Link>
                </span>
              </DropdownMenuItem>
             
              {!isDeleted && (
                <DropdownMenuItem
                  onClick={() => handleDeleteClick(project.id)}
                  className="text-red-600"
                >
                  <span className="flex items-center">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span className="cursor-pointer">Delete idea</span>
                  </span>
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

  // Status filter options
  const statusOptions = [
    { label: 'Under Review', value: 'UNDER_REVIEW' },
    { label: 'Approved', value: 'APPROVED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Draft', value: 'DRAFT' },
  ];

  // Handle status filter change
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
    <div className="w-full">
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center">
        <Input
          placeholder="Filter by title..."
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
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows?.length} of{' '}
          {table.getFilteredRowModel().rows?.length} row(s) selected.
        </div>
        <div className="space-x-2">
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