const Modal = ({ show, onClose, children }) => {
  return (
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="fixed top-0 left-0 w-full h-full z-10 transition-all duration-500"
    >
      <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-slate-800 py-6 px-4">
        <button
          onClick={() => {
            onClose(false);
          }}
          className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-600"
        >
          X
        </button>
        <div className="max-h-[calc(80vh-4rem)] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
