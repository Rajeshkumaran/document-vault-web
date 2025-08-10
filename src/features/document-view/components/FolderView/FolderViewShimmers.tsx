import * as React from 'react';

export const FolderViewLoadingShimmer: React.FC = () => {
  return (
    <div className='p-6 bg-gray-50 min-h-full'>
      {/* Header Shimmer */}
      <div className='mb-6'>
        <div className='flex items-center space-x-4 mb-4'>
          <div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse'></div>
          <div>
            <div className='w-32 h-7 bg-gray-200 rounded animate-pulse mb-2'></div>
            <div className='w-16 h-4 bg-gray-200 rounded animate-pulse'></div>
          </div>
        </div>
      </div>

      {/* Folders Section Shimmer */}
      <div className='mb-8'>
        <div className='flex items-center mb-4'>
          <div className='w-5 h-5 bg-gray-200 rounded animate-pulse mr-2'></div>
          <div className='w-16 h-6 bg-gray-200 rounded animate-pulse'></div>
          <div className='w-8 h-4 bg-gray-200 rounded animate-pulse ml-2'></div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {[...Array(4)].map((_, index) => (
            <FolderShimmerCard key={`folder-shimmer-${index}`} />
          ))}
        </div>
      </div>

      {/* Files Section Shimmer */}
      <div>
        <div className='flex items-center mb-4'>
          <div className='w-5 h-5 bg-gray-200 rounded animate-pulse mr-2'></div>
          <div className='w-12 h-6 bg-gray-200 rounded animate-pulse'></div>
          <div className='w-8 h-4 bg-gray-200 rounded animate-pulse ml-2'></div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
          {[...Array(8)].map((_, index) => (
            <FileShimmerCard key={`file-shimmer-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FolderShimmerCard: React.FC = () => {
  return (
    <div className='bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center text-center min-h-[140px] animate-pulse'>
      <div className='mb-3 flex-shrink-0'>
        <div className='w-12 h-12 bg-orange-200 rounded animate-pulse'></div>
      </div>
      <div className='flex-1 flex flex-col justify-between w-full'>
        <div className='w-3/4 h-4 bg-gray-200 rounded animate-pulse mb-2 mx-auto'></div>
        <div className='w-1/2 h-3 bg-gray-200 rounded animate-pulse mx-auto'></div>
      </div>
    </div>
  );
};

const FileShimmerCard: React.FC = () => {
  return (
    <div className='bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center text-center min-h-[140px] animate-pulse'>
      <div className='mb-3 flex-shrink-0'>
        <div className='bg-gray-100 rounded-lg p-2'>
          <div className='w-8 h-8 bg-gray-300 rounded animate-pulse'></div>
        </div>
      </div>
      <div className='flex-1 flex flex-col justify-between w-full'>
        <div className='w-4/5 h-4 bg-gray-200 rounded animate-pulse mb-2 mx-auto'></div>
        <div className='w-1/3 h-3 bg-gray-200 rounded animate-pulse mx-auto'></div>
      </div>
    </div>
  );
};

export { FolderShimmerCard, FileShimmerCard };
