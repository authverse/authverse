"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "./ui/button";
import Link from "next/link";

const GithubRepo = () => {
  return (
    <Button variant="outline" asChild>
      <Link href="https://github.com/abdirahmanmahamoud/authverse">
        <IconBrandGithub className="size-4" />
      </Link>
    </Button>
  );
};

export default GithubRepo;
