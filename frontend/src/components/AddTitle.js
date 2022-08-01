import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function AddTitle() {
  const { setAddTitle, loginInfo, setLoginInfo } = useContext(AppContext);

  const [newTitleName, setNewTitleName] = useState("");

  const handleNewTitleName = (e) => {
    setNewTitleName(e.target.value);
  };

  const cancelAddTitle = () => {
    setAddTitle(false);
  };

  const handleAddTitle = async (ev) => {
    try {
      ev.preventDefault();
      const addTitle = await axios.post("/hrManagers/addTitle", {
        titleName: newTitleName,
      });
      swal({
        title: "Success!",
        text: `${addTitle.data}`,
        icon: "success",
        button: "continue!",
      });
      const newLoginInfo = { ...loginInfo };
      newLoginInfo.titlesList.push({
        title: newTitleName,
      });
      setLoginInfo(newLoginInfo);
      setAddTitle(false);
    } catch (e) {
      swal({
        title: "Add Title Failed!",
        text: `${e.response.data}`,
        icon: "error",
        button: "okay",
      });
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Add Title</h2>
        <div onClick={cancelAddTitle} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleAddTitle}>
        <div className={styles.formWrapper}>
            <TextField
              size="small"
              required
              type="text"
              value={newTitleName}
              onChange={handleNewTitleName}
              sx={{ margin: "20px" }}
              label="Title Name"
            />
        </div>
        <input className={styles.hrLink} value={"Add Title"} type="submit" />
      </form>
    </div>
  );
}

export default AddTitle;
