// app/auth/page.tsx
import AuthForm from "../components/AuthForm";
import styles from "../page.module.css"; // Reutilizăm stilurile

export default function AuthPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* NavBar-ul poate fi omis sau simplificat pe pagina de Auth */}
        <div className={styles.authWrapper}>
          <AuthForm />
        </div>
      </main>
    </div>
  );
}
