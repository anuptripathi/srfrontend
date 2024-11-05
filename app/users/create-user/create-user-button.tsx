"use client";

import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateUserModal from "./create-user-modal";
import { useState } from "react";

export default function CreateUserFab() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <CreateUserModal
        open={modalVisible}
        handleClose={() => setModalVisible(false)}
      />
      <div className="absolute left-20 bottom-10">
        <Fab color="primary" onClick={() => setModalVisible(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
