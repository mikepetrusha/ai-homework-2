"use client";

import { useState, useCallback } from "react";
import { User } from "@/types/user";
import styles from "@/styles/UserTable.module.css";
import UserModal from "@/components/UserModal";

interface UserTableProps {
  users: User[];
  onDeleteUser: (id: number) => void;
}

function UserTable({
  users,
  onDeleteUser,
}: UserTableProps): React.ReactElement {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleRowClick = useCallback((user: User): void => {
    setSelectedUser(user);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setSelectedUser(null);
  }, []);

  const handleDelete = useCallback(
    (e: React.MouseEvent, userId: number): void => {
      e.stopPropagation();
      setDeletingId(userId);

      setTimeout(() => {
        onDeleteUser(userId);
        setDeletingId(null);
      }, 300);
    },
    [onDeleteUser]
  );

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>NAME / EMAIL</th>
              <th>ADDRESS</th>
              <th>PHONE</th>
              <th>WEBSITE</th>
              <th>COMPANY</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`${styles.tableRow} ${
                  deletingId === user.id ? styles.deletingRow : ""
                }`}
                onClick={() => handleRowClick(user)}
              >
                <td className={styles.tableCell}>
                  {user.name}
                  <span className={styles.emailText}>{user.email}</span>
                </td>
                <td className={styles.tableCell}>
                  {user.address.city}, {user.address.street}
                </td>
                <td className={styles.tableCell}>{user.phone}</td>
                <td className={styles.tableCell}>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.websiteText}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {user.website}
                  </a>
                </td>
                <td className={styles.tableCell}>{user.company.name}</td>
                <td className={`${styles.tableCell} ${styles.actionCell}`}>
                  <button
                    className={`${styles.actionButton} ${
                      deletingId === user.id ? styles.deletingButton : ""
                    }`}
                    onClick={(e) => handleDelete(e, user.id)}
                    aria-label={`Delete ${user.name}`}
                    disabled={deletingId !== null}
                  >
                    {deletingId === user.id ? "..." : "✕"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={!!selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default UserTable;
