import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'error' | 'warning' | 'privacy';

const STYLES: Record<AlertVariant, {
  bg: string; border: string;
  icon: React.ElementType; iconClass: string; textClass: string;
}> = {
  info:    { bg: 'bg-blue-50',   border: 'border-blue-200',   icon: AlertCircle,  iconClass: 'text-blue-600',   textClass: 'text-blue-900'   },
  success: { bg: 'bg-green-50',  border: 'border-green-200',  icon: CheckCircle,  iconClass: 'text-green-600',  textClass: 'text-green-900'  },
  error:   { bg: 'bg-red-50',    border: 'border-red-200',    icon: XCircle,      iconClass: 'text-red-600',    textClass: 'text-red-900'    },
  warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertCircle,  iconClass: 'text-yellow-600', textClass: 'text-yellow-900' },
  privacy: { bg: 'bg-purple-50', border: 'border-purple-200', icon: AlertCircle,  iconClass: 'text-purple-600', textClass: 'text-purple-900' },
};

interface AlertBannerProps {
  variant: AlertVariant;
  children: React.ReactNode;
  className?: string;
}

export function AlertBanner({ variant, children, className = '' }: AlertBannerProps) {
  const { bg, border, icon: Icon, iconClass, textClass } = STYLES[variant];
  return (
    <div className={`flex items-start gap-3 p-4 ${bg} border ${border} rounded-lg ${className}`}>
      <Icon className={`size-5 ${iconClass} mt-0.5 flex-shrink-0`} />
      <div className={`text-sm ${textClass}`}>{children}</div>
    </div>
  );
}
