import auth from "panoptes-client/lib/auth";
import { useState } from "react";

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  auth.checkCurrent();
}

export default function usePanoptesAuthToken() {
  const [token, setToken] = useState(null);

  async function fetchPanoptesAuthToken() {
    await auth.checkCurrent();
    const newToken = await auth.checkBearerToken();
    if (newToken !== token) {
      setToken(newToken);
    }
  }

  fetchPanoptesAuthToken();
  return token;
}
