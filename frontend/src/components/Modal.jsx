function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div>
      <div onClick={onClose}></div>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
