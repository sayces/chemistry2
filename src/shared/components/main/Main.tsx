interface MainProps {
  children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen">
      {children}
    </main>
  );
};

export default Main;
