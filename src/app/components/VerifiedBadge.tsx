import { Badge } from './ui/badge';

interface VerifiedBadgeProps {
  compact?: boolean;
  className?: string;
}

export function VerifiedBadge({ compact = false, className = '' }: VerifiedBadgeProps) {
  return (
    <Badge className={`bg-green-100 text-green-700 hover:bg-green-100 ${compact ? 'text-xs px-1.5 py-0' : ''} ${className}`}>
      {compact ? '✓' : '✓ Verificado'}
    </Badge>
  );
}
