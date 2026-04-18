import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import { blogPosts, getBlogPost } from "@/data/blogPosts";

const SITE_URL = "https://glimmerink.co.ke";

const ContentBlock = ({ block }) => {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-5 space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const prev = sortedPosts[currentIndex + 1] || null;
  const next = sortedPosts[currentIndex - 1] || null;

  useEffect(() => {
    if (!post) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: "Ehud Mwai",
        url: `${SITE_URL}/about`,
      },
      publisher: {
        "@type": "Organization",
        name: "GlimmerInk Creations",
        url: SITE_URL,
      },
      url: `${SITE_URL}/blog/${post.slug}`,
      keywords: post.tags.join(", "),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-schema";
    script.text = JSON.stringify(schema);
    const existing = document.getElementById("article-schema");
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById("article-schema");
      if (s) s.remove();
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full text-xs font-semibold text-primary dark:text-primary-light">
              <Tag className="w-3 h-3" />
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

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6 font-display">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-primary pl-5">
            {post.excerpt}
          </p>

          <div className="mt-6 flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
              EM
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Ehud Mwai</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">GlimmerInk Creations</p>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose-custom"
        >
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </motion.div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-600 dark:text-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                to={`/blog/${prev.slug}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-colors"
              >
                <span className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next && (
              <Link
                to={`/blog/${next.slug}`}
                className="group flex flex-col gap-1 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary-light transition-colors text-right"
              >
                <span className="flex items-center justify-end gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-light transition-colors line-clamp-2">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Need a website for your business?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm">
            Let's build something that works — fast, professional, and built for Kenya.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors text-sm"
          >
            Start a conversation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
