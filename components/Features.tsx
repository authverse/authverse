import {
  LockClosedIcon,
  PersonIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  GlobeIcon,
  CheckCircledIcon,
} from "@radix-ui/react-icons";

export const featuresItems = [
  {
    title: "Full Auth Setup",
    description:
      "Generate a complete authentication system instantly with Better Auth configuration.",
    icon: LockClosedIcon,
  },
  {
    title: "Login & Signup Screens",
    description:
      "Ready-made, beautiful ShadCN UI screens for login, signup, and forgot password.",
    icon: PersonIcon,
  },
  {
    title: "Forgot Password Flow",
    description:
      "Automated password reset system with secure token handling and email support.",
    icon: EnvelopeClosedIcon,
  },
  {
    title: "Google OAuth",
    description:
      "Enable Google login instantly with auto-generated OAuth configuration.",
    icon: GlobeIcon,
  },
  {
    title: "GitHub OAuth",
    description:
      "Built-in GitHub OAuth integration ready to use out of the box.",
    icon: GitHubLogoIcon,
  },
  {
    title: "TypeScript + Modern Setup",
    description:
      "Clean, scalable, and production-ready folder structure generated automatically.",
    icon: CheckCircledIcon,
  },
];

const Features = () => {
  return (
    <div className="w-full py-12 px-6 lg:px-16 mx-auto">
      <h1 className="leading-tighter text-3xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold text-center">
        Features
      </h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {featuresItems.map((item, index) => (
          <div
            className="w-full p-7 shadow-xl shadow-black/5 rounded-lg dark:bg-primary-600/65 dark:shadow-stone-900/25 bg-slate-100/55 dark:bg-stone-900"
            key={index}
          >
            <item.icon className="size-9" />
            <h1 className="text-lg font-medium mt-5 leading-5">{item.title}</h1>
            <p className="text-sm font-normal mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
