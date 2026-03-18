interface PageInfoProps {
  title: string;
  description: string;
}

export function PageInfo({ title, description }: PageInfoProps) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
      <h2 className="font-semibold text-lg text-blue-900 mb-2">
        ¿Qué hace esta opción?
      </h2>
      <p className="text-sm text-blue-800 leading-relaxed">
        <strong>{title}:</strong> {description}
      </p>
    </div>
  );
}
