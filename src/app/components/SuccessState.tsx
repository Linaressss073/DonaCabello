import { CheckCircle } from 'lucide-react';

interface SuccessStateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function SuccessState({ title, description, children }: SuccessStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="size-10 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {children && (
        <div className="flex flex-wrap gap-4 justify-center">{children}</div>
      )}
    </div>
  );
}
