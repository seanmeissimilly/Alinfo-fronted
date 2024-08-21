import PropTypes from "prop-types";
import { Button, IconButton } from "@material-tailwind/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePrevPage,
  handleNextPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-between mt-4">
      <Button
        variant="text"
        className="flex items-center gap-2 normal-case"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <AiOutlineLeft className="h-4 w-4" /> Anterior
      </Button>
      <div className="flex items-center gap-2">
        {[...Array(totalPages).keys()].map((index) => (
          <IconButton
            key={index + 1}
            variant={currentPage === index + 1 ? "filled" : "text"}
            color="gray"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 normal-case"
        onClick={handleNextPage}
        disabled={currentPage * itemsPerPage >= totalItems}
      >
        Siguiente <AiOutlineRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default Pagination;
