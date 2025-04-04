function Loading({ loadingText = "Loading" }) {
  return (
    <div className="flex gap-2 items-center ">
      <p>{loadingText}</p>
      <img className="h-5 animate-spin" src="/pencil.svg" alt="pencil" />
    </div>
  );
}

export default Loading;
