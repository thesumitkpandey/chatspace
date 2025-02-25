import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="w-full sm:w-1/3 bg-gray-900 h-screen p-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="h-6 w-24 bg-gray-700 rounded mb-4"></div>

      {/* Chat List Skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3 p-3">
            {/* Profile Image Skeleton */}
            <div className="w-10 h-10 bg-gray-700 rounded-full"></div>

            {/* Chat Name Skeleton */}
            <div className="h-4 w-2/3 bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
