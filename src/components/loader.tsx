import { Spinner } from "@nextui-org/spinner";

interface Props {
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

export default function Loader({ isLoading, error, children }: Props) {
  if (isLoading) {
    return (
      <div className="w-100 h-100 p-10 flex justify-center items-center backdrop-blur-lg backdrop-saturate-150 bg-background/70">
        <Spinner label="Loading..." color="warning" />
      </div>
    );
  }

  if (error) return <pre>{error.message}</pre>;

  return children;
}