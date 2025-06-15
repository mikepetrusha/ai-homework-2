import { User } from "@/types/user";
import { fetchUsers } from "@/services/user-service";
import styles from "@/styles/Page.module.css";
import { Suspense } from "react";
import UsersClient from "../components/UsersClient";

async function getUsers(): Promise<{ users: User[]; error: string | null }> {
  try {
    const users = await fetchUsers();
    return { users, error: null };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      users: [],
      error: "Failed to load users. Please try again later.",
    };
  }
}

export default async function Home() {
  const { users, error } = await getUsers();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Users</h1>
        </div>
      </header>

      <main className={styles.main}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        {!error && users.length === 0 && (
          <div className={styles.emptyMessage}>No users found.</div>
        )}

        {!error && users.length > 0 && (
          <Suspense
            fallback={
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
              </div>
            }
          >
            <UsersClient initialUsers={users} />
          </Suspense>
        )}
      </main>
    </div>
  );
}
