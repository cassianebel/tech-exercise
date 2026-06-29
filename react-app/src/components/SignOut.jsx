import { authClient } from "../lib/auth-client";

export default function SignOut() {
  async function handleSignOut() {
    const { error } = await authClient.signOut();

    if (error) {
      console.error(error);
      return;
    }

    alert("Signed out!");
  }

  return <button onClick={handleSignOut}>Sign Out</button>;
}
