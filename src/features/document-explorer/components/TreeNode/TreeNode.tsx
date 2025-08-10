import * as React from 'react';
import { DocumentNode, FileNode, FolderNode } from '../../interfaces/common';
import { ChevronRight, ChevronDown, FolderOpen } from 'lucide-react';

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
        className={`flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors ${
          isSelected ? 'bg-orange-100 text-orange-800' : 'text-gray-700'
        }`}
        style={{ paddingLeft: `${level * 1.25 + 0.5}rem` }}
      >
        {hasChildren ? (
          <button
            className='w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer'
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown className='h-3 w-3' />
            ) : (
              <ChevronRight className='h-3 w-3' />
            )}
          </button>
        ) : (
          <span className='w-4 h-4' />
        )}

        <div
          className='flex items-center gap-2 flex-1 cursor-pointer'
          onClick={() => {
            if (onFolderClick) {
              onFolderClick(node as FolderNode);
            }
          }}
        >
          <FolderOpen className={`h-4 w-4 ${isExpanded ? 'text-orange-600' : 'text-orange-500'}`} />

          <span className='text-sm truncate font-medium'>{node.name}</span>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {folderChildren.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              expanded={expanded}
              onToggle={onToggle}
              onFileClick={onFileClick}
              onFolderClick={onFolderClick}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
