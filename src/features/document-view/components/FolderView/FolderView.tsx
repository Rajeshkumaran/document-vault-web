import * as React from 'react';
import {
  Folder,
  File,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Archive,
  ChevronRight,
} from 'lucide-react';
import type { FolderItem, FolderViewProps } from '../../interfaces/common';
import { UploadDropZone } from '@/features/document-explorer/components/UploadDropZone/UploadDropZone';
import { UploadProgressIndicator } from '@/features/document-explorer/components/UploadProgressIndicator/UploadProgressIndicator';
import { FolderViewLoadingShimmer } from './FolderViewShimmers';

const getFileIcon = (fileType?: string) => {
  if (!fileType) return <File className='w-8 h-8' />;

  const type = fileType.toLowerCase();

  if (type.includes('pdf') || type.includes('doc') || type.includes('txt')) {
    return <FileText className='w-8 h-8 text-red-500' />;
  }
  if (
    type.includes('image') ||
    type.includes('jpg') ||
    type.includes('png') ||
    type.includes('gif')
  ) {
    return <ImageIcon className='w-8 h-8 text-green-500' />;
  }
  if (type.includes('audio') || type.includes('mp3') || type.includes('wav')) {
    return <Music className='w-8 h-8 text-purple-500' />;
  }
  if (type.includes('video') || type.includes('mp4') || type.includes('avi')) {
    return <Video className='w-8 h-8 text-blue-500' />;
  }
  if (type.includes('zip') || type.includes('rar') || type.includes('tar')) {
    return <Archive className='w-8 h-8 text-orange-500' />;
  }

  return <File className='w-8 h-8 text-gray-500' />;
};

const FolderItem: React.FC<{
  item: FolderItem;
  onFolderClick?: (folderId: string, folderName: string) => void;
  onFileClick?: (fileId: string, fileName: string) => void;
}> = ({ item, onFolderClick, onFileClick }) => {
  const handleClick = () => {
    if (item.type === 'folder') {
      onFolderClick?.(item.id, item.name);
    } else {
      onFileClick?.(item.id, item.name);
    }
  };

  return (
    <div
      className='relative group cursor-pointer bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center text-center min-h-[140px]'
      onClick={handleClick}
    >
      {item.isLocked && (
        <div className='absolute top-2 right-2'>
          <div className='w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center'>
            <div className='w-2 h-2 bg-white rounded-full' />
          </div>
        </div>
      )}

      <div className='mb-3 flex-shrink-0'>
        {item.type === 'folder' ? (
          <Folder className='w-12 h-12 text-orange-400' fill='currentColor' />
        ) : (
          <div className='bg-gray-50 rounded-lg p-2'>{getFileIcon(item.fileType)}</div>
        )}
      </div>

      <div className='flex-1 flex flex-col justify-between w-full'>
        <h3 className='text-sm font-medium text-gray-900 truncate w-full mb-1'>{item.name}</h3>

        <div className='text-xs text-gray-500 space-y-1'>
          {item.type === 'folder' && item.count !== undefined && (
            <div className='flex items-center justify-center space-x-1'>
              <File className='w-3 h-3' />
              <span>{item.count}</span>
              {item.count !== 1 && <span>items</span>}
              {item.count === 1 && <span>item</span>}
            </div>
          )}

          {item.type === 'file' && item.size && <div>{item.size}</div>}
        </div>
      </div>

      {item.type === 'folder' && (
        <ChevronRight className='w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute top-1/2 right-2 transform -translate-y-1/2' />
      )}
    </div>
  );
};

export const FolderView: React.FC<FolderViewProps> = ({
  folderName = 'My Files',
  items,
  onFolderClick,
  onFileClick,
  onBackClick,
  showBackButton = false,
  loading = false,
  allowFileTypes = ['.pdf', '.docx', '.txt', '.jpg', '.png'],
  onUploadFiles,
  uploads = [],
  onClearCompleted,
}) => {
  const folders = items.filter((item) => item.type === 'folder');
  const files = items.filter((item) => item.type === 'file');

  if (loading) {
    return <FolderViewLoadingShimmer />;
  }

  return (
    <div className='p-6 bg-gray-50 min-h-full'>
      {/* Header */}
      <div className='mb-6'>
        <div className='flex items-center space-x-4 mb-4'>
          {showBackButton && (
            <button
              onClick={onBackClick}
              className='p-2 rounded-full hover:bg-gray-200 transition-colors'
              aria-label='Go back'
            >
              <ArrowLeft className='w-5 h-5 text-gray-600' />
            </button>
          )}
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>{folderName}</h1>
            <p className='text-sm text-gray-500'>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Upload Drop Zone */}
        {onUploadFiles && (
          <div className='mb-4'>
            <UploadDropZone
              allowFileTypes={allowFileTypes}
              onUploadFiles={(files, folderName) => onUploadFiles(files, folderName)}
            />
          </div>
        )}

        {/* Breadcrumb could go here if needed */}
      </div>

      {/* Empty state */}
      {items.length === 0 && !onUploadFiles && (
        <div className='flex flex-col items-center justify-center h-64 text-gray-500'>
          <Folder className='w-16 h-16 mb-4 text-gray-300' />
          <h3 className='text-lg font-medium mb-2'>This folder is empty</h3>
          <p className='text-sm'>Upload files or create subfolders to get started</p>
        </div>
      )}

      {/* Empty state with upload zone */}
      {items.length === 0 && onUploadFiles && (
        <div className='flex flex-col items-center justify-center h-64 text-gray-500'>
          <Folder className='w-16 h-16 mb-4 text-gray-300' />
          <h3 className='text-lg font-medium mb-2'>This folder is empty</h3>
          <p className='text-sm'>Use the upload area above to add files to this folder</p>
        </div>
      )}

      {/* Folders Section */}
      {folders.length > 0 && (
        <div className='mb-8'>
          <div className='flex items-center mb-4'>
            <Folder className='w-5 h-5 text-gray-600 mr-2' />
            <h2 className='text-lg font-semibold text-gray-900'>Folders</h2>
            <span className='ml-2 text-sm text-gray-500'>({folders.length})</span>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                item={folder}
                onFolderClick={onFolderClick}
                onFileClick={onFileClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Files Section */}
      {files.length > 0 && (
        <div>
          <div className='flex items-center mb-4'>
            <File className='w-5 h-5 text-gray-600 mr-2' />
            <h2 className='text-lg font-semibold text-gray-900'>Files</h2>
            <span className='ml-2 text-sm text-gray-500'>({files.length})</span>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {files.map((file) => (
              <FolderItem
                key={file.id}
                item={file}
                onFolderClick={onFolderClick}
                onFileClick={onFileClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress Indicator */}
      {uploads.length > 0 && (
        <UploadProgressIndicator uploads={uploads} onClearCompleted={onClearCompleted} />
      )}
    </div>
  );
};
