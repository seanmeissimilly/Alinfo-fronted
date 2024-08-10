import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";

const Modal = ({ onClose, onConfirm, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-black bg-opacity-50 absolute inset-0"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10">
        {children}
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            className="bg-gray-500 text-black text-lg px-4 py-2 rounded hover:bg-gray-700 normal-case"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            className="bg-red-400 text-black text-lg px-4 py-2 rounded hover:bg-red-700 normal-case"
            onClick={onConfirm}
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
