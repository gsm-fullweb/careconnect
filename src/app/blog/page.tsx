import MainLayout from "@/components/layout/MainLayout";
import Link from "next/link";
import { blogPostContent } from "./blogPostData";

export default function BlogList() {
  const posts = Object.entries(blogPostContent);

  return (
    <MainLayout>
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Blog
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(([slug, post]) => (
              <div key={slug} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                <Link href={`/blog/${slug}`} className="text-primary hover:underline">
                  Leia mais
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
