/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { functions, VERIFY_INSTITIUTIONS_EMAIL_FUNCTION_ID } from "../appwrite";

const VerifyInstitution = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  async function verifyPrimarieEmail(email: string) {
    try {
      const response = await functions.createExecution({
        functionId: VERIFY_INSTITIUTIONS_EMAIL_FUNCTION_ID,
        body: JSON.stringify({ email }),
      });

      const data = JSON.parse(response.responseBody);
      setResult(data);
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    }
  }

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Introdu email primarie" />
      <button onClick={() => verifyPrimarieEmail(email)}>Verifica email</button>

      {result && <div style={{ marginTop: 10, color: result.success ? "green" : "red" }}>{result.message}</div>}
    </div>
  );
};

export default VerifyInstitution;
