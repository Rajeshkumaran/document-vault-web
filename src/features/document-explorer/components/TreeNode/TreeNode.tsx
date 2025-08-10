import * as React from 'react';
import { DocumentNode, FileNode, FolderNode } from '../../interfaces/common';
import { ChevronRight, ChevronDown, Folder, FolderOpen } from 'lucide-react';

export interface TreeNodeProps {
  node: DocumentNode;
  level: number;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onFileClick?: (file: FileNode) => void;
  onFolderClick?: (folder: FolderNode) => void;
  selectedFile?: FileNode | null;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  expanded,
  onToggle,
  onFileClick,
  onFolderClick,
  selectedFile,
}) => {
  const isFolder = node.type === 'folder';

  // Only render folders, skip files
  if (!isFolder) {
    return null;
  }

  // Filter children to only include folders
  const folderChildren = node.children?.filter((child) => child.type === 'folder') || [];
  const hasChildren = folderChildren.length > 0;
  const isExpanded = expanded.has(node.id);
  const isSelected = selectedFile?.id === node.id;

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
          isSelected
            ? 'bg-orange-100 text-orange-900 shadow-sm ring-1 ring-orange-200'
            : 'text-gray-700 hover:bg-orange-50 hover:text-orange-800'
        }`}
        style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
      >
        {hasChildren ? (
          <button
            className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${
              isSelected
                ? 'text-orange-600 hover:text-orange-700'
                : 'text-gray-400 hover:text-gray-600 group-hover:text-orange-500'
            }`}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown className='h-4 w-4' />
            ) : (
              <ChevronRight className='h-4 w-4' />
            )}
          </button>
        ) : (
          <span className='w-5 h-5 flex items-center justify-center'>
            <div className='w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-orange-400 transition-colors' />
          </span>
        )}

        <div
          className='flex items-center gap-2.5 flex-1 cursor-pointer min-w-0'
          onClick={() => {
            if (onFolderClick) {
              onFolderClick(node as FolderNode);
            }
          }}
        >
          <div
            className={`flex-shrink-0 transition-colors ${
              isExpanded && isSelected
                ? 'text-orange-600'
                : isExpanded
                ? 'text-orange-500'
                : isSelected
                ? 'text-orange-500'
                : 'text-orange-400 group-hover:text-orange-500'
            }`}
          >
            {isExpanded ? <FolderOpen className='h-4 w-4' /> : <Folder className='h-4 w-4' />}
          </div>

          <span
            className={`text-sm font-medium truncate ${
              isSelected ? 'text-orange-900' : 'text-gray-700 group-hover:text-orange-800'
            }`}
          >
            {node.name}
          </span>

          {/* Item count badge */}
          {node.children && node.children.length > 0 && (
            <span
              className={`ml-auto flex-shrink-0 px-2 py-0.5 text-xs rounded-full font-medium transition-colors ${
                isSelected
                  ? 'bg-orange-200 text-orange-800'
                  : 'bg-gray-200 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-700'
              }`}
            >
              {node.children.length}
            </span>
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className='ml-2 border-l border-gray-200 group-hover:border-orange-200 transition-colors'>
          {folderChildren.map((child) => (
            <div key={child.id} className='pl-0.5'>
              <TreeNode
                node={child}
                level={level + 1}
                expanded={expanded}
                onToggle={onToggle}
                onFileClick={onFileClick}
                onFolderClick={onFolderClick}
                selectedFile={selectedFile}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
