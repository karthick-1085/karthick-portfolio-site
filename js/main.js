/**
 * KARTHICK G — PORTFOLIO INTERACTIVE LOGIC
 * Features: Smooth Scroll, Animated Metrics, Modal Popup Dialogs, Project Filters, 3D Tilt Effect
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initHeaderScroll();
  initMobileMenu();
  initTiltEffect();
  initScrollReveal();
  initMetricCounters();
  initProjectFilters();
  initProjectModals();
  initEnquiryModal();
  initROICalculator();
  initFormSubmissions();
});

/* 1. Scroll Progress Bar */
function initScrollProgress() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, { passive: true });
}

/* 2. Header Scroll Glassmorphic Styling & Active Nav */
function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
    
    // Highlight Active Link on Scroll
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* 3. Mobile Navigation Toggle & Drawer Overlay */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const backdrop = document.getElementById('mobileBackdrop');
  
  if (!toggleBtn || !navLinks) return;
  
  function closeMenu() {
    navLinks.classList.remove('active');
    backdrop?.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '☰';
    document.body.style.overflow = '';
  }

  function openMenu() {
    navLinks.classList.add('active');
    backdrop?.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = '✕';
    document.body.style.overflow = 'hidden';
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = navLinks.classList.contains('active');
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop?.addEventListener('click', closeMenu);
  
  // Close mobile menu when link or modal trigger is clicked
  document.querySelectorAll('.nav-link, .trigger-enquiry-modal').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* 4. 3D Perspective Tilt on Hero Avatar */
function initTiltEffect() {
  const card = document.getElementById('heroAvatarCard');
  if (!card) return;
  
  const wrapper = card.parentElement;
  
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* 5. IntersectionObserver Scroll Reveal Animations */
function initScrollReveal() {
  const elements = document.querySelectorAll('.animate-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  elements.forEach(el => observer.observe(el));
}

/* 6. Animated Metric Numerical Counters */
function initMetricCounters() {
  const counters = document.querySelectorAll('.metric-number[data-target]');
  let animated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const decimals = counter.getAttribute('data-decimals') ? parseInt(counter.getAttribute('data-decimals')) : 0;
          
          let start = 0;
          const duration = 1800; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              start = target;
              clearInterval(timer);
            }
            counter.textContent = `${prefix}${start.toFixed(decimals)}${suffix}`;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });
  
  const metricsSection = document.getElementById('metricsSection');
  if (metricsSection) observer.observe(metricsSection);
}

/* 7. Category Filter Tabs for Case Studies */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* 8. Detailed Project Modal Popup Drawer */
const projectDetailsData = {
  vakilsearch: {
    title: "Vakilsearch (Zolvit)",
    role: "Growth Owner — Lawyers & GST Verticals",
    category: "SEO, GEO/AEO & Programmatic Growth",
    overview: "At Vakilsearch, Karthick drove organic & PPC acquisition across 300+ legal, tax, and compliance services. As Growth Owner for the Lawyers & GST categories, he built scalable programmatic frameworks and AI-search visibility.",
    challenge: "High competition for high-intent legal keywords and the need to scale organic search coverage across thousands of location-specific and specialization-based lawyer search queries.",
    strategy: [
      "Architected and deployed a Programmatic SEO (PSEO) engine that dynamically generated & optimized 4,000+ lawyer listing pages.",
      "Optimized content for Generative Engine Optimization (GEO/AEO) targeting AI Overviews (Google SGE) and ChatGPT search experiences.",
      "Full-funnel CRO overhaul across high-intent landing pages for Online Lawyer Consultation & GST Registration."
    ],
    results: [
      "Scaled organic traffic from 0 to 10,000+ monthly clicks within just 3 months.",
      "+75% Increase in qualified lead generation.",
      "+50% Conversion Rate improvement across primary landing pages.",
      "Secured #1 ranking and AI Overview features for queries like 'Online Legal Consultation', 'Property Lawyers', and 'Sole Proprietorship Registration'."
    ]
  },
  nippon: {
    title: "Nippon Paint",
    role: "Lead SEO & Growth Strategist",
    category: "Organic Search & Technical Recovery",
    overview: "Nippon Paint is one of Asia's largest paint & coatings manufacturers. Karthick spearheaded the SEO strategy to capture immense organic demand across consumer and industrial paint segments.",
    challenge: "Severe site downtime crash due to IT firewall indexing blocks, alongside missing schema tags and internal linking gaps.",
    strategy: [
      "Published 170+ high-intent keyword-optimized blogs, category guides, and product pages.",
      "Implemented rich Schema structured data for image search and AI snippet positioning.",
      "Proactively diagnosed the Google indexing crash, collaborated with IT to resolve firewall rules, and re-indexed sitemaps within days to achieve traffic levels exceeding baseline."
    ],
    results: [
      "918,000+ Organic Clicks achieved in a single year.",
      "46.5 Million+ Organic Impressions generated.",
      "27,300+ Keywords ranked across SERP top positions."
    ]
  },
  kaleesuwari: {
    title: "Kaleesuwari (Gold Winner)",
    role: "SEO Team Lead",
    category: "Brand & E-Commerce Growth",
    overview: "Kaleesuwari is the parent brand of iconic FMCG & cooking oil products (Gold Winner, Cardia, Dheepam, Eldia). Initiated comprehensive organic growth overhaul.",
    challenge: "The website had low page speeds, zero ranking for branded terms, and unoptimized technical structure.",
    strategy: [
      "Low-hanging fruit keyword strategy to capture quick wins on commercial intent queries.",
      "Created structured sub-brand category pages & interlinked blog silos directly to commercial product pages.",
      "High-authority domain backlink acquisition drive."
    ],
    results: [
      "83,200 Total Organic Clicks within Year 1.",
      "+28.5% Click growth in 1st 6 months (Oct '23 - Mar '24).",
      "+41% Accelerated click growth in 2nd 6 months (Apr '24 - Sep '24)."
    ]
  },
  drools: {
    title: "Drools Pet Food",
    role: "SEO Team Lead",
    category: "Technical Audit & Revamp",
    overview: "Drools is India's leading pet nutrition brand. Karthick led the WordPress website SEO revamp and analytics tracking setup.",
    challenge: "Complete lack of Google Search Console tracking, unindexed product catalog, and page speed bottlenecks.",
    strategy: [
      "Configured Google Search Console & GA4 analytics tracking architecture.",
      "Extensive keyword research for dog & cat nutrition categories.",
      "Technical code cleanups, image compression, and on-page metadata optimization."
    ],
    results: [
      "Explosive organic search growth achieved within 60 days of launch.",
      "First-page rankings secured across core pet food product queries."
    ]
  },
  classmate: {
    title: "ITC Classmate",
    role: "E-Commerce Ads & Listing Lead",
    category: "Amazon Vendor Central & Quick-Commerce",
    overview: "Classmate is India's premier stationery brand. Karthick managed multi-channel listing optimization and digital ad campaigns across Amazon, Flipkart, Blinkit, and Zepto.",
    challenge: "Scaling quick-commerce visibility and optimizing Vendor Central content for high-volume back-to-school search spikes.",
    strategy: [
      "Designed and uploaded high-converting A+ Content and Storefront assets via Vendor Central.",
      "Optimized product listings with New Product Introductions (NPI).",
      "Managed ad campaigns across Amazon Sponsored Products, Blinkit, and Zepto."
    ],
    results: [
      "Sustained #1 Best Seller status in key stationery subcategories.",
      "Significant ROI boost across quick-commerce platform campaigns."
    ]
  },
  camel: {
    title: "Camel (Camlin)",
    role: "E-Commerce Advertising Specialist",
    category: "Amazon PI & Campaign Strategy",
    overview: "Camlin is an iconic art materials brand for artists and students. Karthick executed end-to-end listing content and advertising optimization.",
    challenge: "Maximizing ROI across hundreds of art supply SKUs on Amazon.",
    strategy: [
      "Utilized Amazon Premium Intelligence (PI) tool for deep performance diagnostics.",
      "Uploaded custom A+ Content & product store assets via Vendor Central.",
      "Resolved catalog suppression issues with Amazon Seller/Vendor Support."
    ],
    results: [
      "Increased conversion rates across core art product categories.",
      "Enhanced campaign ROI through Amazon PI diagnostic data."
    ]
  },
  oyvu: {
    title: "Oyvu Luxury Bedsheets",
    role: "E-Commerce Growth Lead",
    category: "Amazon Seller Central & Fulfillment",
    overview: "Oyvu is a premium luxury home textile brand offering duvet covers, throws, and luxury bedsheets.",
    challenge: "Entering a heavily price-sensitive market dominated by budget sellers on Amazon Seller Central.",
    strategy: [
      "Integrated Amazon Self-Ship API with third-party logistics fulfillment.",
      "Premium brand positioning strategy focusing on fabric thread count and luxury value propositions.",
      "Targeted Sponsored Brands & Sponsored Products ad campaigns."
    ],
    results: [
      "Achieved a 3.0+ Advertising ROI milestone on Amazon.",
      "Successfully established brand positioning in the luxury bedsheets segment."
    ]
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeProjectModal');
  
  if (!modalOverlay) return;
  
  document.querySelectorAll('.btn-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectId = btn.getAttribute('data-project');
      const data = projectDetailsData[projectId];
      
      if (data) {
        document.getElementById('modalProjectTitle').textContent = data.title;
        document.getElementById('modalProjectRole').textContent = data.role;
        document.getElementById('modalProjectOverview').textContent = data.overview;
        document.getElementById('modalProjectChallenge').textContent = data.challenge;
        
        // Strategy list
        const strategyUl = document.getElementById('modalProjectStrategy');
        strategyUl.innerHTML = data.strategy.map(item => `<li>${item}</li>`).join('');
        
        // Results list
        const resultsUl = document.getElementById('modalProjectResults');
        resultsUl.innerHTML = data.results.map(item => `<li>${item}</li>`).join('');
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* 9. Hero "Grow Your Business" Popup Enquiry Modal */
function initEnquiryModal() {
  const modalOverlay = document.getElementById('enquiryModal');
  const triggerBtns = document.querySelectorAll('.trigger-enquiry-modal');
  const closeBtn = document.getElementById('closeEnquiryModal');
  
  if (!modalOverlay) return;
  
  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* 10. Interactive Growth Potential Calculator */
function initROICalculator() {
  const goalSelect = document.getElementById('calcGoal');
  const channelSelect = document.getElementById('calcChannel');
  const outputNum = document.getElementById('calcOutputNum');
  const outputLabel = document.getElementById('calcOutputLabel');
  
  if (!goalSelect || !channelSelect || !outputNum) return;
  
  function updateCalculator() {
    const goal = goalSelect.value;
    const channel = channelSelect.value;
    
    let resultText = "+150%";
    let labelText = "Estimated Organic Growth Potential";
    
    if (channel === 'pseo') {
      resultText = "4,000+";
      labelText = "Indexable Location & Specialty Intent Pages";
    } else if (channel === 'geo') {
      resultText = "Top 3";
      labelText = "Rankings in Google AI Overviews & ChatGPT";
    } else if (channel === 'amazon') {
      resultText = "3.2x";
      labelText = "Target Advertising ROI (ROAS)";
    } else if (goal === 'leads') {
      resultText = "+75%";
      labelText = "Average Qualified Lead Surge";
    } else if (goal === 'cro') {
      resultText = "+50%";
      labelText = "Conversion Rate Improvement";
    }
    
    outputNum.textContent = resultText;
    outputLabel.textContent = labelText;
  }
  
  goalSelect.addEventListener('change', updateCalculator);
  channelSelect.addEventListener('change', updateCalculator);
}

/* 11. Form Submissions (Google Sheets Integration + Lead Capture) */
const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwZTP6a8dHsCbX5ersvnJC0fJR9DR19bKscgu39tIWpo1BRPy8AqcnQm8PHEA_takM/exec';

function initFormSubmissions() {
  const popupForm = document.getElementById('popupEnquiryForm');
  const bottomForm = document.getElementById('bottomContactForm');
  const toast = document.getElementById('toastNotice');
  
  function handleForm(form, modalIdToClose, sourceName) {
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
      
      // Capture timestamp and form values
      const now = new Date();
      const timestamp = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const nameVal = form.querySelector('input[type="text"]')?.value || '';
      const emailVal = form.querySelector('input[type="email"]')?.value || '';
      const websiteVal = form.querySelector('input[type="url"]')?.value || 'N/A';
      const serviceVal = form.querySelector('select')?.value || '';
      const messageVal = form.querySelector('textarea')?.value || '';
      
      const leadData = {
        timestamp: timestamp,
        name: nameVal,
        email: emailVal,
        website: websiteVal,
        service: serviceVal,
        message: messageVal,
        source: sourceName
      };
      
      // 1. Store in Local Storage Backup
      try {
        const existingLeads = JSON.parse(localStorage.getItem('karthick_enquiries') || '[]');
        existingLeads.push(leadData);
        localStorage.setItem('karthick_enquiries', JSON.stringify(existingLeads));
      } catch (err) {
        console.log('LocalStorage backup error:', err);
      }
      
      // 2. Dispatch to Google Sheets Web App Endpoint (if URL provided)
      if (GOOGLE_SHEETS_SCRIPT_URL && GOOGLE_SHEETS_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        fetch(GOOGLE_SHEETS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(leadData)
        }).catch(err => console.log('Google Sheets submit error:', err));
      }
      
      setTimeout(() => {
        submitBtn.innerHTML = '✓ Enquiry Sent!';
        showToast('Thank you! Your enquiry has been received and logged.');
        form.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          if (modalIdToClose) {
            document.getElementById(modalIdToClose)?.classList.remove('active');
            document.body.style.overflow = '';
          }
        }, 1500);
      }, 800);
    });
  }
  
  handleForm(popupForm, 'enquiryModal', 'Hero Popup Modal');
  handleForm(bottomForm, null, 'Bottom Enquiry Form');
  
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
  
  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
}
