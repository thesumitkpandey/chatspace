import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="space-y-4 p-4">
      {/* Incoming Message */}
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="space-y-2">
          <div className="w-40 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Outgoing Message */}
      <div className="flex items-start space-x-3 justify-end">
        <div className="space-y-2 text-right">
          <div className="w-32 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
          <div className="w-40 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Incoming Message */}
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="space-y-2">
          <div className="w-48 h-4 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
