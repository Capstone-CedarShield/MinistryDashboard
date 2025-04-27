function Container({ children, title }) {
  return (
    <div className="container mx-auto border p-5 mt-2 shadow-lg rounded-lg max-w-full ">
      <h1 className="text-2xl font-semibold text-black-700 pl-6">{title}</h1>
      {children}
    </div>
  );
}
export default Container;
