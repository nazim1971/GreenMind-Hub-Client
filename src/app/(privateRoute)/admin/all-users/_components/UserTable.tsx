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
  Trash2,
  Search,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TUser } from '@/types';
import { updateUserStatus } from '../_actions';
import { toast } from 'sonner';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avater';

// Define the columns for the data table
export const columns: ColumnDef<TUser>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div className="font-medium">{name}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue('email') as string;
      return <div className="font-medium">{email}</div>;
    },
  },
  {
    accessorKey: 'passwordChangedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Password Changed
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const passwordChangedAt = row.getValue('passwordChangedAt') as
        | string
        | null;
      return (
        <div className="text-center">
          {passwordChangedAt
            ? new Date(passwordChangedAt).toLocaleDateString()
            : 'Never'}
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return (
        <Badge
          variant={role === 'ADMIN' ? 'default' : 'outline'}
          className="capitalize"
        >
          {role.toLowerCase()}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'image',
    header: 'Avatar',
    cell: ({ row }) => {
      const user = row.original;
      const name = user.name || 'User';
      const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      return (
        <div className="flex justify-center">
          <Avatar>
            <AvatarImage src={user.image || ''} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return (
        <Badge
          variant={isActive ? 'default' : 'destructive'}
          className="capitalize"
        >
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
  },
  {
    id: 'ideasCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ideas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      const ideasCount = user.ideas?.length || 0;
      return <div className="text-center font-medium">{ideasCount}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const countA = rowA.original.ideas?.length || 0;
      const countB = rowB.original.ideas?.length || 0;
      return countA - countB;
    },
  },
  {
    id: 'paymentsCount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Payments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      const paymentsCount = user.payments?.length || 0;
      return <div className="text-center font-medium">{paymentsCount}</div>;
    },
    sortingFn: (rowA, rowB) => {
      const countA = rowA.original.payments?.length || 0;
      const countB = rowB.original.payments?.length || 0;
      return countA - countB;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

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
                navigator.clipboard.writeText(user.id);
                toast.success('UserId copied to dashboard');
              }}
            >
              <span className="flex items-center">
                <span className="mr-2 cursor-pointer">Copy ID</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                <span className="cursor-pointer">View profile</span>
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <span className="flex items-center">
                <Trash2 className="mr-2 h-4 w-4" />
                <span
                  className={
                    user.isActive
                      ? 'text-red-600 cursor-pointer'
                      : 'text-green-600 cursor-pointer'
                  }
                  onClick={() => updateUserStatus(user.id, !user.isActive)}
                >
                  {user.isActive ? 'Deactivate user' : 'Activate user'}
                </span>
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataTableProps {
  data: TUser[];
}

export function UserDataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [searchField, setSearchField] = useState<string>('name');

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

  // Role filter options
  const roleOptions = [
    { label: 'Member', value: 'MEMBER' },
    { label: 'Admin', value: 'ADMIN' },
  ];

  // Handle role filter change
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(prev => {
      const newFilter = prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value];

      table
        .getColumn('role')
        ?.setFilterValue(newFilter.length ? newFilter : undefined);
      return newFilter;
    });
  };

  // Handle search field change
  const handleSearchChange = (value: string) => {
    table.getColumn(searchField)?.setFilterValue(value);
  };

  // Handle search field selection change
  const handleSearchFieldChange = (value: string) => {
    // Clear previous filter
    table.getColumn(searchField)?.setFilterValue('');
    setSearchField(value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-center space-x-2">
            <Select value={searchField} onValueChange={handleSearchFieldChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Search field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="id">ID</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search by ${searchField}...`}
                value={
                  (table.getColumn(searchField)?.getFilterValue() as string) ??
                  ''
                }
                onChange={event => handleSearchChange(event.target.value)}
                className="pl-8"
              />
            </div>
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
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map(option => (
            <Badge
              key={option.value}
              variant={
                roleFilter.includes(option.value) ? 'default' : 'outline'
              }
              className="cursor-pointer"
              onClick={() => handleRoleFilterChange(option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
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
    </div>
  );
}