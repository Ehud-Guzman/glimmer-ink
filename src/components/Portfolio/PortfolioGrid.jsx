import React, { useState } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';
import PortfolioItem from './PortfolioItem';
import SectionWrapper from './SectionWrapper';

const PortfolioGrid = ({ portfolioItems }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [expandedProject, setExpandedProject] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filtered projects
  const filteredProjects = portfolioItems
    .filter((item) => activeFilter === 'all' || item.category === activeFilter)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .slice(0, visibleProjects);

  // Load more projects
  const loadMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  return (
    <SectionWrapper
      id="portfolio"
      title="Our Portfolio"
      subtitle="A selection of our recent creative projects"
    >
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div className="w-full md:w-auto">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[var(--current-nav)] rounded-lg md:hidden"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <FiFilter /> Filters
          </button>

          <div
            className={`${
              isFilterOpen ? 'block' : 'hidden'
            } md:block mt-2 md:mt-0`}
          >
            <div className="flex flex-wrap gap-2">
              {['all', 'branding', 'print', 'digital', 'environmental'].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full capitalize transition-all text-sm ${
                      activeFilter === filter
                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                        : 'bg-[var(--current-nav)] hover:bg-[var(--current-nav)]/80'
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 opacity-60" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--current-nav)] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <FiX />
            </button>
          )}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <PortfolioItem
            key={project.id}
            project={project}
            isExpanded={expandedProject === project.id}
            onExpand={() =>
              setExpandedProject(
                expandedProject === project.id ? null : project.id
              )
            }
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleProjects < portfolioItems.length && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Load More Projects
          </button>
        </div>
      )}
    </SectionWrapper>
  );
};

export default PortfolioGrid;