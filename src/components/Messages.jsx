import { MegaphoneIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export default function Messages({ children }) {
  return (
    <div className="bg-indigo-600">
      <div className="container mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <MegaphoneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 truncate font-medium text-white">
              <span className="hidden md:inline">{children}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

Messages.propTypes = {
  children: PropTypes.node.isRequired,
};
