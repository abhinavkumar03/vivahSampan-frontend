interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
}

export function Loading({ fullScreen, message = 'Loading...' }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

export function LoadingOverlay() {
  return <Loading fullScreen />;
}
