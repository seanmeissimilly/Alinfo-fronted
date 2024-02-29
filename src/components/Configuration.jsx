import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messages from "./Messages.jsx";
import Loader from "./Loader.jsx";
import { getListUsers } from "../actions/userActions";
import ReactPaginate from 'react-paginate';



export default function Configuration() {

    //Declaro la url de la Api en dependencia del entorno
    const URL =
        process.env.NODE_ENV === "production"
            ? import.meta.env.VITE_BACKEND_URL
            : "http://localhost:8000";

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { users, error, loading } = userList;


    useEffect(() => {

        dispatch(getListUsers());
        toast.success("Configuración", {
            position: "bottom-right",
            style: {
                background: "#101010",
                color: "#fff",
            },
        });
    }, [dispatch]);

    function changePage({ selected }) {
        setPageNumber(selected);
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Messages>{error}</Messages>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mx-auto">Editar Roles de Usuarios</h2>
                    <table className="table-auto mx-auto">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Avatar</th>
                                <th className="px-4 py-2">Nombre de Usuario</th>
                                <th className="px-4 py-2">Correo</th>
                                <th className="px-4 py-2">Rol</th>
                                <th className="px-4 py-2">Editar Usuario</th>
                                <th className="px-4 py-2">Editar Rol</th>
                                <th className="px-4 py-2">Borrar Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.slice(pagesVisited, pagesVisited + usersPerPage).map(user => (
                                <tr key={user.id}>
                                    <td className="border px-4 py-2"><img className="h-10 w-10 rounded-full" src={`${URL}${user.image}`} alt="" /></td>
                                    <td className="border px-4 py-2">{user.user_name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.role}</td>
                                    <td className="border px-4 py-2"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { }}>Editar Usuario</button></td>
                                    <td className="border px-4 py-2"><button className="bg-yellow-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { }/*handleEditUserRole(user.id)*/}>Editar Rol</button></td>
                                    <td className="border px-4 py-2"><button className="bg-red-500 p-3  text-white font-bold py-2 px-4 rounded" onClick={async () => {
                                        const accepted = window.confirm("¿Está seguro que desea borrar al usuario?");
                                        if (accepted) {
                                            //await deleteTask(params.id);
                                            toast.success("Usuario Borrado", {
                                                position: "bottom-right",
                                                style: {
                                                    background: "#101010",
                                                    color: "#fff",
                                                },
                                            });
                                            //navigate("/tasks");
                                        }
                                    }}>Borrar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center">
                        <ReactPaginate
                            previousLabel={'Anterior'}
                            nextLabel={'Siguiente'}
                            pageCount={Math.ceil(users.length / usersPerPage)}
                            onPageChange={changePage}
                            containerClassName={'pagination'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                            disabledClassName={'disabled'}
                            activeClassName={'active'}
                        />
                    </div>
                </div>
            )}
            <Toaster />
        </>
    );
}