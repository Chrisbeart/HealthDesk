// components/Skeleton.jsx

import React from 'react';

export const ScheduleSkeleton = () => (
  <div className="flex flex-col space-y-2 animate-pulse">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center justify-between p-4 bg-gray-300 bg-opacity-60 rounded">
        <div className="flex flex-col space-y-2">
          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2"></div>
        </div>
        <div className="h-4 bg-gray-400 rounded w-1/4"></div>
      </div>
    ))}
  </div>
);

export const NotificationsSkeleton = () => (
  <div className="flex flex-col space-y-2 animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="p-4 bg-gray-300 bg-opacity-60 rounded"></div>
    ))}
  </div>
);
 
export const NewsSkeleton = () => (
  <div className="flex flex-col space-y-4 animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex items-center p-4 bg-gray-300 bg-opacity-60 rounded-2xl">
        <div className="h-12 w-12 bg-gray-400 rounded mr-4"></div>
        <div className="h-4 bg-gray-400 rounded w-full"></div>
      </div>
    ))}
  </div>
);
