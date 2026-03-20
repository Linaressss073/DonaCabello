interface CTABannerProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export function CTABanner({ title, description, children, className = '' }: CTABannerProps) {
  return (
    <div className={`bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-lg p-8 text-center ${className}`}>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="mb-6 text-pink-100 max-w-2xl mx-auto">{description}</p>
      {children && (
        <div className="flex flex-wrap gap-4 justify-center">{children}</div>
      )}
    </div>
  );
}
