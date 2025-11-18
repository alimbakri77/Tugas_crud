import { useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

const UserPage = () => {
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setSelected(null);
    setRefresh(prev => prev + 1);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manajemen User</h2>

      <UserForm user={selected} onSuccess={handleSuccess} />
      <UserList key={refresh} onEdit={setSelected} />
    </div>
  );
};

export default UserPage;
