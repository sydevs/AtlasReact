import { Spinner } from "@nextui-org/spinner";
//import { Alert } from "@nextui-org/alert";

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

  if (error) {
    return (
      <div className="p-10 bg-panel text-center">
        {/*<Alert color="danger" title={error.message} />*/}
        {error.message}
      </div>
    );
  }

  return children;
}