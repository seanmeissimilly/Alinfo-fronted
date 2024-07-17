import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  documentDetails,
  documentUpdate,
  documentCreate,
  documentclassificationList,
  documenttypesList,
} from "../redux/documentSlice";

function DocumentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [classification, setClassification] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const params = useParams();

  const { documentInfo, error, loading } = useSelector(
    (state) => state.document
  );

  const { userInfo } = useSelector((state) => state.user);

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(documentUpdate({ id: params.id, token: userInfo.token }));
    } else {
      dispatch(documentCreate({ token: userInfo.token }));
    }

    navigate("/documents");
  };

  useEffect(() => {
    if (params.id) {
      dispatch(documentDetails({ token: userInfo.token }));
    }
  }, [params, userInfo, dispatch]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label className="block text-sm font-bold">Task:</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        //value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Write a title"
        autoFocus
      />
      <label>
        Description:
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          //value={task.description}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          placeholder="Write a description"
        />
      </label>
      <button type="submit" className="bg-indigo-600 px-2 py-1">
        Submit
      </button>
    </form>
  );
}

export default DocumentForm;
