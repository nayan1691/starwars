interface ErrorComponentProps {
  error: string;
}

export default function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <>
      <h1 className="pt-8 text-2xl text-center">Something went wrong</h1>
      <h1 className="pt-8 text-xl text-center">Reason - {error}</h1>
      <h1 className="pt-8 text-xl text-center">
        Try refreshing page or contact xyz@abc.com
      </h1>
    </>
  );
}
