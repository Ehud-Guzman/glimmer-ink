import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import { blogPosts } from "@/data/blogPosts";
import pageSeo from "@/data/pageSeo";
import { blogCollection } from "@/data/schema";

const categoryColors = {
  Business: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Design: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Development: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Pricing: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  "Local SEO": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

const BLOG_SCHEMA = [blogCollection(blogPosts)];

const Blog = () => {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead {...pageSeo.blog} jsonLd={BLOG_SCHEMA} />

      {/* Hero */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto pt-10 pb-8 md:pt-16 md:pb-10 animate-fade-up">
        <p className="mb-4 flex items-center gap-3 font-mono text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-primary dark:text-primary-light">
          <span className="h-px w-8 bg-primary/60 dark:bg-primary-light/60" aria-hidden="true" />
          Blog
        </p>
        <h1 className="font-display text-[2rem] leading-[1.1] sm:text-5xl font-bold tracking-tight text-balance mb-4 text-gray-900 dark:text-white">
          Practical advice for businesses
          <span className="block bg-gradient-to-r from-primary via-primary-light to-primary-dark dark:from-primary-light dark:via-primary dark:to-primary-dark bg-clip-text text-transparent">
            getting online in Kenya.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Plain-language articles on websites, pricing and getting found on Google, written from real
          client work in Busia and across Kenya.
        </p>
      </section>

      {/* Posts */}
      <section className="pb-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="space-y-8">
          {sorted.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 sm:p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-600 dark:text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-light hover:gap-3 transition-all"
                >
                  Read article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
