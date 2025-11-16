"use client";

import React, { useState } from "react";
import styles from "../page.module.css";

export default function AuthForm() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const toggleMode = () => setIsSignIn((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignIn && !agreedToTerms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }

    const action = isSignIn ? "Login" : "Registration";
    console.log(`${action} attempt with form data...`);
    alert(`Success: ${action} logic executed!`);
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isSignIn ? "Sign In" : "Create Account (Sign Up)"}</h2>

      <form onSubmit={handleSubmit} className={styles.authForm}>
        {/* Câmpul de Email */}
        <input type="email" placeholder="Email" required className={styles.authInput} />

        {/* Câmpul de Nume (doar pentru SignUp) */}
        {!isSignIn && <input type="text" placeholder="Full Name" required className={styles.authInput} />}

        {/* Câmpul de Parolă */}
        <input type="password" placeholder="Password" required className={styles.authInput} />

        {/* Termeni și Condiții (doar pentru SignUp) */}
        {!isSignIn && (
          <div className={styles.termsAndConditions}>
            <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
            <label htmlFor="terms">
              I agree to the{" "}
              <a href="/terms" target="_blank">
                Terms and Conditions
              </a>
            </label>
          </div>
        )}

        <button type="submit" className={styles.authButton}>
          {isSignIn ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className={styles.authSwitch}>
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <span onClick={toggleMode} className={styles.switchLink}>
          {isSignIn ? "Sign Up" : "Sign In"}
        </span>
      </p>
    </div>
  );
}
