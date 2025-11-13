"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";

const GithubProviders = () => {
  const signIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };
  return (
    <Button className="w-full text-base" variant="outline" onClick={signIn}>
      <FaGithub />
      Sign in with GitHub
    </Button>
  );
};

export default GithubProviders;
