import * as React from 'react';

export const NavigationTreeShimmer: React.FC = () => {
  return (
    <div className='p-4'>
      <div className='w-full space-y-2'>
        {/* Root level folders */}
        {[...Array(3)].map((_, index) => (
          <TreeNodeShimmer key={`root-${index}`} level={0} hasChildren={true} />
        ))}

        {/* Nested folders - level 1 */}
        <div className='ml-2 border-l border-gray-200'>
          {[...Array(2)].map((_, index) => (
            <div key={`level1-${index}`} className='pl-0.5'>
              <TreeNodeShimmer level={1} hasChildren={false} />
            </div>
          ))}
        </div>

        {/* Nested folders - level 2 */}
        <div className='ml-4 border-l border-gray-200'>
          <div className='pl-0.5'>
            <TreeNodeShimmer level={2} hasChildren={false} />
          </div>
        </div>

        {/* More root level folders */}
        {[...Array(2)].map((_, index) => (
          <TreeNodeShimmer key={`root2-${index}`} level={0} hasChildren={true} />
        ))}

        {/* More nested folders */}
        <div className='ml-2 border-l border-gray-200'>
          {[...Array(3)].map((_, index) => (
            <div key={`level1-2-${index}`} className='pl-0.5'>
              <TreeNodeShimmer level={1} hasChildren={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface TreeNodeShimmerProps {
  level: number;
  hasChildren?: boolean;
}

const TreeNodeShimmer: React.FC<TreeNodeShimmerProps> = ({ level, hasChildren = false }) => {
  return (
    <div
      className='flex items-center gap-2.5 px-3 py-2.5 rounded-lg animate-pulse bg-gray-50'
      style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
    >
      {/* Expand/collapse chevron placeholder */}
      <div className='w-5 h-5 flex items-center justify-center'>
        {hasChildren ? (
          <div className='w-4 h-4 bg-gray-300 rounded animate-pulse'></div>
        ) : (
          <div className='w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse'></div>
        )}
      </div>

      {/* Folder icon placeholder */}
      <div className='w-4 h-4 bg-orange-200 rounded animate-pulse'></div>

      {/* Folder name placeholder */}
      <div
        className={`h-4 bg-gray-300 rounded animate-pulse ${
          level === 0 ? 'w-28' : level === 1 ? 'w-24' : 'w-20'
        }`}
      ></div>

      {/* Item count badge placeholder */}
      {hasChildren && (
        <div className='ml-auto w-6 h-5 bg-gray-200 rounded-full animate-pulse'></div>
      )}
    </div>
  );
};

export { TreeNodeShimmer };
