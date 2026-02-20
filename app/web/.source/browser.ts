// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"(root)/changelog.mdx": () => import("../content/docs/(root)/changelog.mdx?collection=docs"), "(root)/index.mdx": () => import("../content/docs/(root)/index.mdx?collection=docs"), "(root)/installation.mdx": () => import("../content/docs/(root)/installation.mdx?collection=docs"), "auth/credentials.mdx": () => import("../content/docs/auth/credentials.mdx?collection=docs"), "auth/email-verification.mdx": () => import("../content/docs/auth/email-verification.mdx?collection=docs"), "auth/forgetPassword.mdx": () => import("../content/docs/auth/forgetPassword.mdx?collection=docs"), "integrations/Email.mdx": () => import("../content/docs/integrations/Email.mdx?collection=docs"), "integrations/nextjs.mdx": () => import("../content/docs/integrations/nextjs.mdx?collection=docs"), "integrations/tanstackstart.mdx": () => import("../content/docs/integrations/tanstackstart.mdx?collection=docs"), "oauth/Apple.mdx": () => import("../content/docs/oauth/Apple.mdx?collection=docs"), "oauth/Facebook.mdx": () => import("../content/docs/oauth/Facebook.mdx?collection=docs"), "oauth/Github.mdx": () => import("../content/docs/oauth/Github.mdx?collection=docs"), "oauth/Google.mdx": () => import("../content/docs/oauth/Google.mdx?collection=docs"), "oauth/LinkedIn.mdx": () => import("../content/docs/oauth/LinkedIn.mdx?collection=docs"), "oauth/Twitter.mdx": () => import("../content/docs/oauth/Twitter.mdx?collection=docs"), }),
};
export default browserCollections;