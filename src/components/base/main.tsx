
type Props = {
  children: React.ReactNode;
  width?: number | undefined;
}

export function Main({
  width = 400,
  children
} : Props) {
  return (
    <main className='fixed z-50 shadow-md flex flex-col' style={{ width: width}}>
      {children}
    </main>
  );
}
