import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowRight, FiChevronDown, FiExternalLink } from 'react-icons/fi';
import { FaInstagram, FaTwitter, FaDribbble, FaBehance } from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Ehud Mwai',
      role: 'Founder & Creative Director',
      bio: 'Visionary leader merging traditional craftsmanship with digital innovation.',
      image: '/images/Guzman.jpg',
      social: {
        instagram: 'https://instagram.com/ehud_guzman',
        twitter: 'https://twitter.com/Glimmerink_',
        dribbble: 'https://dribbble.com/Ehud_Guzman'
      }
    },
    {
      id: 2,
      name: 'Sarah Chebet',
      role: 'Lead Designer',
      bio: 'Brand identity specialist with an eye for timeless design.',
      image: '',
      social: {
        instagram: '#',
        behance: '#'
      }
    },
 
  ]);

  const [values] = useState([
    {
      title: 'Radical Creativity',
      description: 'We challenge conventions to deliver groundbreaking solutions.',
      icon: '✨'
    },
    {
      title: 'Pixel Perfection',
      description: 'Obsessive attention to detail in every deliverable.',
      icon: '🔍'
    },
    {
      title: 'Client Alchemy',
      description: 'Transforming your vision into visual gold.',
      icon: '⚗️'
    },
    {
      title: 'Sustainable Innovation',
      description: 'Eco-conscious solutions without compromising quality.',
      icon: '🌿'
    },
    {
      title: 'Relentless Evolution',
      description: 'Continuous learning to stay ahead of trends.',
      icon: '📈'
    },
    {
      title: 'Community Heart',
      description: 'Giving back through mentorship and pro bono work.',
      icon: '❤️'
    }
  ]);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="min-h-screen bg-[var(--current-bg)] text-[var(--current-text)]">
      {/* Hero Parallax Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale, opacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--current-nav)] to-[var(--current-bg)]"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-accent/20 blur-3xl"></div>
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <motion.div 
            className="text-center max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary">
                Our Creative
              </span>
              <span className="block">DNA</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto mb-12">
              The alchemy of ink, pixels, and passion that defines our work
            </p>
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.a
                href="#story"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium flex items-center gap-2"
                whileHover={{ y: -3, boxShadow: '0 10px 20px -10px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Story <FiArrowRight />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
         
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Story Section */}
        <section id="story" className="py-28 relative">
          <div className="absolute -top-20 left-0 w-full h-20 bg-gradient-to-b from-transparent to-[var(--current-bg)] z-10"></div>
          
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/glimmerink.avif" 
                    alt="Our creative studio" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary/20 rounded-2xl -z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              ></motion.div>
            </div>

            <div>
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="text-primary">From</span> a spark <span className="text-secondary">to</span> a flame
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
 <p>
  Founded in 2023 by Ehud Mwai, GlimmerInk was built on a clear vision — to craft seamless, intelligent, and visually striking digital experiences. From day one, our focus has been on development that feels premium, performs flawlessly, and scales effortlessly.
</p>
<p>
  Over time, we’ve grown into a multidisciplinary studio specializing in web applications, automation, and interactive design systems. Every line of code and pixel we create is driven by precision, performance, and purpose.
</p>
<p>
  Today, GlimmerInk stands as a development-first agency redefining how brands connect, operate, and grow in the digital era — bridging creativity with robust engineering to deliver results that actually move the needle.
</p>

                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-28"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {[
              { number: "50+", label: "Satisfied Clients", color: "primary" },
              { number: "10+", label: "Projects Delivered", color: "secondary" },
              { number: "98%", label: "Retention Rate", color: "accent" },
              { number: "+", label: "Industry Awards", color: "primary" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className={`bg-gradient-to-br from-${stat.color}/10 to-${stat.color}/5 p-8 rounded-2xl backdrop-blur-sm border border-${stat.color}/10`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
              >
                <p className={`text-4xl font-bold mb-2 text-${stat.color}`}>{stat.number}</p>
                <p className="opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-28">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="text-primary">Minds</span> Behind the Magic
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              A diverse collective of creatives, technologists, and visionaries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <motion.div 
                key={member.id}
                className="group relative overflow-hidden rounded-2xl bg-[var(--current-nav)] shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div>
                      <p className="text-white text-sm mb-4">{member.bio}</p>
                      <div className="flex space-x-4">
                        {member.social.instagram && (
                          <a href={member.social.instagram} className="text-white hover:text-primary transition-colors">
                            <FaInstagram size={18} />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="text-white hover:text-primary transition-colors">
                            <FaTwitter size={18} />
                          </a>
                        )}
                        {member.social.dribbble && (
                          <a href={member.social.dribbble} className="text-white hover:text-primary transition-colors">
                            <FaDribbble size={18} />
                          </a>
                        )}
                        {member.social.behance && (
                          <a href={member.social.behance} className="text-white hover:text-primary transition-colors">
                            <FaBehance size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-secondary mt-1">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Culture */}
          <motion.div 
            className="mt-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 backdrop-blur-sm border border-primary/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-8 text-center">
                Our <span className="text-primary">Creative</span> Culture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Collaborative Spirit",
                    description: "We believe the best ideas emerge from diverse perspectives working in harmony.",
                    icon: "🤝"
                  },
                  {
                    title: "Playful Experimentation",
                    description: "Dedicated time for creative play and unconventional thinking.",
                    icon: "🎨"
                  },
                  {
                    title: "Continuous Growth",
                    description: "Weekly learning sessions and annual skill development budgets.",
                    icon: "🌱"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="bg-[var(--current-nav)] p-6 rounded-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="opacity-90">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Values Section */}
        <section id="values" className="py-28">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Core</span> Beliefs
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              The principles that guide every decision and design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-[var(--current-nav)] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: '0 20px 25px -15px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="text-4xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="opacity-90 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Values in Action */}
          <motion.div 
            className="mt-28 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-3xl p-12 backdrop-blur-sm border border-secondary/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl font-bold mb-12 text-center">
                Values <span className="text-secondary">In Action</span>
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <ul className="space-y-8">
                    {[
                      "Monthly creative jam sessions where all team members collaborate across disciplines",
                      "Sustainable printing initiative using 100% recycled materials",
                      "Pro bono design work for local non-profits and community organizations",
                      "Continuous education program with annual conference attendance"
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-4 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <img 
                      src="/images/about/values-action.jpg" 
                      alt="Our values in action" 
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-28">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Journey</span> Through Time
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Key milestones that shaped our creative evolution
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
            
            {/* Timeline items */}
            <div className="space-y-24">
              {[
                {
                  year: "2023",
                  title: "GlimmerInk Founded",
                  description: "Launched from a Nairobi garage with one printer and boundless ambition.",
                  highlight: true
                },
                {
                  year: "2023 Q3",
                  title: "First Corporate Client",
                  description: "Secured our first major corporate account, validating our hybrid approach.",
                  highlight: false
                },
                {
                  year: "2024",
                  title: "Digital Expansion",
                  description: "Added full digital design services to complement our print expertise.",
                  highlight: true
                },
                {
                  year: "2024 Q3",
                  title: "Team Growth",
                  description: "Expanded to a full creative team with specialized roles.",
                  highlight: false
                },
                {
                  year: "2025",
                  title: "Industry Recognition",
                  description: "Received 'Emerging Creative Business of the Year' at the Design Awards.",
                  highlight: true
                },
                {
                  year: "Future",
                  title: "Regional Expansion",
                  description: "Plans underway to establish creative hubs across East Africa.",
                  highlight: false
                }
              ].map((milestone, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-1/2 p-8 ${milestone.highlight ? 'bg-[var(--current-nav)] rounded-2xl shadow-lg' : ''}`}>
                    <h3 className="text-2xl font-semibold mb-3">{milestone.title}</h3>
                    <p className="opacity-90">{milestone.description}</p>
                  </div>
                  <div className="w-1/2 flex justify-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${milestone.highlight ? 'bg-gradient-to-br from-primary to-secondary text-white' : 'bg-[var(--current-nav)] border-2 border-primary/20'} font-bold text-lg shadow-lg`}>
                      {milestone.year}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Create</span> Together?
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Let's blend your vision with our expertise to craft something extraordinary.
            </p>
            <motion.div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium text-lg flex items-center gap-2"
                whileHover={{ y: -3, boxShadow: '0 10px 20px -10px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project <FiArrowRight />
              </motion.a>
              <motion.a
                href="/portfolio"
                className="px-8 py-4 border-2 border-primary text-primary rounded-xl font-medium text-lg flex items-center gap-2"
                whileHover={{ y: -3, backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                View Our Work <FiExternalLink />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;