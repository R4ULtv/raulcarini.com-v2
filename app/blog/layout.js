import BackToTop from "@/components/ui/BackToTop";

export default function MdxLayout({ children }) {
  return (
    <>
      {children}
      <BackToTop />
    </>
  );
}
