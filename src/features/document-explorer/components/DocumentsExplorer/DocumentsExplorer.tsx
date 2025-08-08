import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  ExpandedState,
} from '@tanstack/react-table';
import { useDocumentData } from '../../hooks/useDocumentData';
import { DocumentNode, FileNode } from '../../interfaces/common';
import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { UploadDropZone } from '../UploadDropZone/UploadDropZone';
import { UploadProgressIndicator } from '../UploadProgressIndicator/UploadProgressIndicator';
import { useUploadQueue } from '../../hooks/useUploadQueue';
import { ALLOWED_FILE_TYPES } from '@/lib/constants';

export function DocumentsExplorer({ onFileClick }: { onFileClick?: (file: FileNode) => void }) {
  const { documents } = useDocumentData();
  const { uploads, addFiles, cancelUpload, cancelAllUploads, clearCompleted } = useUploadQueue(5);

  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [localDocs, setLocalDocs] = React.useState<DocumentNode[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    setLocalDocs(documents);
  }, [documents]);

  const filterNodes = React.useCallback((nodes: DocumentNode[], term: string): DocumentNode[] => {
    if (!term) return nodes;
    const lower = term.toLowerCase();
    return nodes
      .map((n) => {
        if (n.type === 'folder') {
          const children = filterNodes(n.children ?? [], term);
          if (n.name.toLowerCase().includes(lower) || children.length) {
            return { ...n, children } as DocumentNode;
          }
          return null;
        }
        return n.name.toLowerCase().includes(lower) ? n : null;
      })
      .filter(Boolean) as DocumentNode[];
  }, []);

  const filteredDocuments = React.useMemo(
    () => filterNodes(localDocs, searchTerm),
    [localDocs, searchTerm, filterNodes],
  );

  const handleFilesAppend = async (newFiles: File[], folderName?: string) => {
    // Add files to the upload queue for parallel processing
    addFiles(newFiles, folderName);
  };

  const columns = React.useMemo<ColumnDef<DocumentNode>[]>(
    () => [
      {
        id: 'name',
        header: () => <span>Name</span>,
        cell: ({ row }) => {
          const isFolder = row.original.type === 'folder';
          const hasChildren = !!row.original.children?.length;
          const expanded = row.getIsExpanded();
          return (
            <div
              style={{ paddingLeft: `${row.depth * 1.25}rem` }}
              className='flex items-center gap-1.5'
            >
              {hasChildren ? (
                <button
                  onClick={row.getToggleExpandedHandler()}
                  className='w-5 h-5 flex items-center justify-center rounded hover:bg-gray-200 text-gray-600'
                  aria-label={expanded ? 'Collapse' : 'Expand'}
                  type='button'
                >
                  {expanded ? (
                    <ChevronDown className='h-4 w-4' />
                  ) : (
                    <ChevronRight className='h-4 w-4' />
                  )}
                </button>
              ) : (
                <span className='w-5 h-5 inline-flex items-center justify-center text-gray-300' />
              )}
              {isFolder ? (
                <Folder className='h-4 w-4 text-orange-600' />
              ) : (
                <FileText className='h-4 w-4 text-gray-400' />
              )}
              <span
                className={
                  isFolder
                    ? 'font-medium text-gray-900'
                    : 'text-gray-700 cursor-pointer hover:underline'
                }
                onClick={() => {
                  if (!isFolder && onFileClick) {
                    onFileClick(row.original as FileNode);
                  }
                }}
                role={!isFolder ? 'button' : undefined}
                tabIndex={!isFolder ? 0 : undefined}
                onKeyDown={(e) => {
                  if (!isFolder && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onFileClick?.(row.original as FileNode);
                  }
                }}
              >
                {row.original.name}
              </span>
            </div>
          );
        },
        accessorFn: (row: DocumentNode) => row.name,
      },
      {
        id: 'fileType',
        header: () => <span>File Type</span>,
        accessorFn: (row) => (row.type === 'file' ? row.fileType : ''),
        cell: ({ getValue }) => {
          const fileType = getValue() as string;
          return <span className='text-gray-500 text-sm capitalize'>{fileType}</span>;
        },
      },
      {
        id: 'createdAt',
        header: () => <span>Created</span>,
        accessorKey: 'createdAt',
        cell: ({ getValue }) => {
          const createdAt = getValue() as string;
          return (
            <span className='text-gray-500 text-sm'>
              {new Date(createdAt).toLocaleDateString()}
            </span>
          );
        },
      },
    ],
    [onFileClick],
  );

  const table = useReactTable({
    data: filteredDocuments,
    columns,
    state: { expanded },
    getSubRows: (row) => row.children ?? [],
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <section className='rounded-lg border border-gray-200 bg-white shadow-sm'>
      <header className='p-4 bg-gray-100'>
        <h1 className='text-xl font-semibold'>Vault</h1>
      </header>
      <main className='flex-1 overflow-y-auto'>
        <UploadDropZone
          allowFileTypes={ALLOWED_FILE_TYPES}
          onUploadFiles={handleFilesAppend}
          allowFolders={true}
        />
        {/* Search */}
        <div className='p-3 border-b border-gray-200'>
          <input
            type='search'
            placeholder='Search documents...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600'
          />
        </div>
        {/* Table */}
        <div className='overflow-x-auto rounded border border-gray-200 bg-white mx-3 mb-4'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-50 text-gray-700'>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className='py-2 px-3 text-left font-medium text-xs tracking-wide'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className='hover:bg-gray-50'>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='py-2 px-3 align-top'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Upload Progress Indicator */}
      <UploadProgressIndicator
        uploads={uploads}
        onCancel={cancelUpload}
        onCancelAll={cancelAllUploads}
        onClearCompleted={clearCompleted}
      />
    </section>
  );
}
