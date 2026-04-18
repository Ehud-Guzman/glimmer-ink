import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import { blogPosts } from "@/data/blogPosts";

const categoryColors = {
  Business: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Design: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Development: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
};

const Blog = () => {
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead
        title="Blog — Web Design & Development Insights for Kenyan Businesses"
        description="Practical articles on web design, development, and digital strategy for businesses in Kenya. Written by Ehud Mwai at GlimmerInk Creations."
        path="/blog"
      />

      {/* Hero */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-full text-sm font-medium text-primary dark:text-primary-light mb-6">
            <Tag className="w-3.5 h-3.5" />
            GlimmerInk Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-display">
            Insights on Web & Digital
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Practical articles on design, development, and the digital landscape — written for businesses building their presence online in Kenya.
          </p>
        </motion.div>
      </section>

      {/* Posts */}
      <section className="pb-24 px-6 max-w-4xl mx-auto">
        <div className="space-y-8">
          {sorted.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-shadow"
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
