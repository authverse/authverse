import FooterSite from "@/web/components/FooterSite";
import SiteHeader from "@/web/components/SiteHeader";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SiteHeader />
      <div className="mt-14">
        {children}
        <FooterSite />
      </div>
    </div>
  );
};

export default SiteLayout;
