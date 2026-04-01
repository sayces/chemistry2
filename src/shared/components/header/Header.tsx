import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-screen">
      <div className="flex justify-center items-baseline w-full pt-[40px]">
        <h1
          className={`text-[31px] font-bold text-green-be drop-shadow-[0_0_4px_#ffffff50]`}
        >
          Chemistry
        </h1>
      </div>
    </header>
  );
};

export default Header;
