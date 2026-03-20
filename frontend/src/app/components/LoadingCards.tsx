import { Card, CardContent, CardHeader } from './ui/card';

interface LoadingCardsProps {
  count?: number;
  variant?: 'grid' | 'list' | 'sidebar';
}

export function LoadingCards({ count = 3, variant = 'grid' }: LoadingCardsProps) {
  const items = Array.from({ length: count });

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {items.map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="space-y-3">
        {items.map((_, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  // grid (default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-8 w-8 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-full" />
          </CardHeader>
          <CardContent>
            <div className="h-8 bg-gray-200 rounded w-full mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
