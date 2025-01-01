import Link from "next/link";
import { Title } from "@/components/Title";
import Image from "next/image";

export default async function Page() {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
   
      <div className="relative w-full h-[600px]"> {/* Added a div wrapper for responsive image */}
        <Image
          src="/mainImage.jpeg" // Path to your image in the public folder
          alt="Home Page image"
          fill // Makes image fill its parent container
          priority // High priority for above-the-fold images
          placeholder="blur" // Show a blurred placeholder
          blurDataURL="data:image/jpeg;base64,..."
          className="object-cover rounded-md"
        />
      </div>
      <Link href="/posts" className="text-blue-500 hover:underline">
        Posts index &rarr;
      </Link>
    </section>
  );
}
