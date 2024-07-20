import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import Report from "./Report.jsx";
import { userList } from "../redux/userSlice.js";
import moment from "moment";

function Reports() {
  const dispatch = useDispatch();

  const { users, userInfo, error, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(userList({ token: userInfo.token }));
    }
  }, [dispatch, userInfo, error]);

  const renderReports = () => {
    // Ordeno los documentos por ID antes de renderizarlos

    // return users.map((user) => {
    return (
      <Report
        key={"user.id"}
        name={"Listado de Usuarios"}
        columns={"user.id"}
        data={"user.id"}
        date={moment().format("DD-MM-YYYY")}
      />
    );
    // });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages>{error}</Messages>
      ) : (
        <div>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {renderReports()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reports;
