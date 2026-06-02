// app/page.js (Next.js 13+)
import Link from "next/link";
import Image from "next/image";
import Navbar  from "../components/navbar/page";

export default function Home() {
  return (
    <div className="">
        {Navbar()}

      <section className="hero">
        {/* Card 1 */}
        <div className="bg-neutral-primary-soft bg-black block max-w-sm border border-default rounded-base shadow-xs">
          <Link href="#">
            <Image
              className="rounded-t-base"
              src="/docs/images/blog/image-1.jpg"
              alt="Blog image"
              width={400}
              height={250}
            />
          </Link>
          <div className="p-6 text-center">
            <span className="inline-flex items-center bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
              Trending
            </span>
            <Link href="#">
              <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-heading">
                Streamlining your design process today.
              </h5>
            </Link>
            <Link
              href="#"
              className="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Read more
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
          <Link href="#">
            <Image
              className="rounded-base"
              src="/docs/images/blog/image-1.jpg"
              alt="Blog image"
              width={400}
              height={250}
            />
          </Link>
          <Link href="#">
            <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">
              Streamlining your design process today.
            </h5>
          </Link>
          <p className="mb-6 text-body">
            In today’s fast-paced digital landscape, fostering seamless
            collaboration among Developers and IT Operations.
          </p>
          <Link
            href="#"
            className="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Read more
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
      <p>&copy; 2026 MyWebsite. All rights reserved.</p>
      <div className="space-x-6 mt-2">
        <a href="/about" className="hover:text-yellow-400">Tentang</a>
        <a href="/privacy" className="hover:text-yellow-400">Privasi</a>
        <a href="/terms" className="hover:text-yellow-400">Syarat</a>
      </div>
    </footer>
    </div>
  );
}
