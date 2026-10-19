import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { seoKeywordCategories } from '../../data/seoKeywords.js';

const SeoServicesHub = () => {
  const [activeTab, setActiveTab] = useState(seoKeywordCategories[0].id);
  const [searchFilter, setSearchFilter] = useState('');
  const [expanded, setExpanded] = useState(false);

  const currentCategory = seoKeywordCategories.find(c => c.id === activeTab) || seoKeywordCategories[0];

  const filteredCategories = seoKeywordCategories.map(cat => ({
    ...cat,
    keywords: cat.keywords.filter(k => 
      k.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      k.popularArea.toLowerCase().includes(searchFilter.toLowerCase())
    )
  })).filter(cat => cat.keywords.length > 0);

  return (
    <section className="bg-[#FAF7F2] py-16 px-5 sm:px-8 lg:px-12 border-t border-[#E8DFD5] relative z-10" id="popular-event-searches">
      <div className="container mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[#C0602F] text-xs">❖</span>
            <span className="text-[#C0602F] text-[11px] font-bold tracking-[0.2em] uppercase">
              Area-Wise Inquiries & Services Directory
            </span>
            <span className="text-[#C0602F] text-xs">❖</span>
          </div>
          <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#2A1810] mb-4">
            Popular Event Inquiries & Specializations
          </h2>
          <p className="text-[14px] sm:text-[15px] text-[#4A2F1D] leading-relaxed font-medium">
            Looking for trusted caterers, wedding decorators, stage fabrication, sound systems, or celebrity management in Bengaluru & Karnataka? Discover our direct service specialties tailored to your event capacity and requirements.
          </p>
        </div>

        {/* Filter input */}
        <div className="max-w-md mx-auto mb-8 relative">
          <input
            type="text"
            placeholder="Search service, e.g. 'Caterers 100 Persons', 'JBL Sound', 'Stage Decorators'..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#FAF6F2] rounded-full border border-[#D5C5B9] text-[13px] text-[#2A1810] placeholder-[#8C7A6B] focus:outline-none focus:border-[#C0602F] shadow-sm transition-all"
          />
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
        </div>

        {/* Tabs for fast navigation if not searching */}
        {!searchFilter && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {seoKeywordCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`text-[12px] font-bold px-4 py-2 rounded-full transition-all border ${
                  activeTab === cat.id
                    ? 'bg-[#4A2F1D] text-white border-[#4A2F1D] shadow-sm'
                    : 'bg-[#FAF6F2] text-[#4A2F1D] border-[#D5C5B9]/70 hover:border-[#4A2F1D]'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        )}

        {/* Content Box */}
        <div className="bg-[#FAF6F2] rounded-3xl border border-[#E8DFD5] p-6 sm:p-8 shadow-sm">
          {!searchFilter ? (
            <div>
              <div className="mb-6 pb-4 border-b border-[#E8DFD5]">
                <h3 className="font-['Playfair_Display',serif] text-2xl font-bold text-[#2A1810] mb-1">
                  {currentCategory.category}
                </h3>
                <p className="text-[13px] text-[#6B5041]">{currentCategory.intro}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {currentCategory.keywords.map((kw, idx) => (
                  <Link
                    key={idx}
                    to={`/contact?service=${encodeURIComponent(kw.name)}`}
                    className="group flex flex-col p-3 rounded-xl bg-white/70 hover:bg-white border border-[#E8DFD5] hover:border-[#C0602F]/50 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-[13px] font-bold text-[#2A1810] group-hover:text-[#C0602F] transition-colors leading-snug">
                        {kw.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-auto pt-1 text-[11px] text-[#8C7A6B]">
                      <MapPin size={11} className="text-[#C0602F] shrink-0" />
                      <span className="truncate">{kw.popularArea}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.length > 0 ? (
                filteredCategories.map(cat => (
                  <div key={cat.id}>
                    <h4 className="font-['Playfair_Display',serif] text-xl font-bold text-[#2A1810] mb-3 pb-2 border-b border-[#E8DFD5]">
                      {cat.category}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {cat.keywords.map((kw, idx) => (
                        <Link
                          key={idx}
                          to={`/contact?service=${encodeURIComponent(kw.name)}`}
                          className="group flex flex-col p-3 rounded-xl bg-white/70 hover:bg-white border border-[#E8DFD5] hover:border-[#C0602F]/50 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                        >
                          <span className="text-[13px] font-bold text-[#2A1810] group-hover:text-[#C0602F] transition-colors leading-snug">
                            {kw.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-[#8C7A6B]">
                            <MapPin size={11} className="text-[#C0602F] shrink-0" />
                            <span>{kw.popularArea}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#8C7A6B]">
                  No matching service query found. Please contact our event coordinators directly!
                </div>
              )}
            </div>
          )}

          {/* Area-wise quick tags snippet */}
          <div className="mt-8 pt-6 border-t border-[#E8DFD5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[12px] text-[#4A2F1D] font-bold">
              <CheckCircle2 size={16} className="text-[#C0602F]" />
              <span>Direct Inquiries: Areawise dispatch across Bengaluru, Mysore, Mangaluru, and Pan-India.</span>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#C0602F] hover:bg-[#A84F22] text-white text-[12px] font-black uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-sm"
            >
              <Sparkles size={13} />
              Book / Enquire For Any Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoServicesHub;
