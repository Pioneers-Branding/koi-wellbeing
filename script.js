/**
 * KOI WELLBEING - Main Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive Symptom / Goal Data Store
    const goalData = {
        energy: {
            category: "RECOMMENDED PROTOCOL: ENERGY & VITALITY",
            title: "Comprehensive Energy & Mitochondrial Reset",
            description: "Persistent fatigue is often linked to underlying adrenal strain, thyroid conversion imbalances, micronutrient deficiencies, or mitochondrial slowdown. We utilize advanced testing (organic acids, complete hormone panels, ferritin) to identify the exact metabolic bottlenecks.",
            badges: [
                "IV Nutrient & NAD+ Therapy",
                "Comprehensive Thyroid & Adrenal Panel",
                "Targeted Peptide Optimization"
            ],
            presetTreatment: "IV Therapy"
        },
        hormone: {
            category: "RECOMMENDED PROTOCOL: ENDOCRINE BALANCE",
            title: "Precision Bioidentical Hormone Optimization (BHRT/TRT)",
            description: "Hormone shifts impact cognition, sleep, mood, body composition, and vitality. Our individualized protocols evaluate free and total testosterone, estradiol, progesterone, DHEA, and thyroid hormones with tailored bioidentical solutions.",
            badges: [
                "Comprehensive Biomarker Testing",
                "Bioidentical Hormone Therapy (BHRT)",
                "Ongoing Physician Monitoring"
            ],
            presetTreatment: "Hormone Therapy"
        },
        metabolism: {
            category: "RECOMMENDED PROTOCOL: METABOLIC RESTORATION",
            title: "Physician-Led Medical Weight Loss & GLP-1 Care",
            description: "Go beyond generic calorie restriction. We investigate insulin sensitivity, leptin resistance, cortisol levels, and visceral adiposity to build sustainable, peptide-supported metabolic care.",
            badges: [
                "GLP-1 / GIP Dual Agonist Protocols",
                "Body Composition & InBody Scans",
                "Nutritional & Metabolic Coaching"
            ],
            presetTreatment: "Medical Weight Loss"
        },
        digestive: {
            category: "RECOMMENDED PROTOCOL: GASTROINTESTINAL HEALING",
            title: "GI-MAP & Microbiome Restoration Protocol",
            description: "Over 70% of the immune system lives in the gut. We test for dysbiosis, leaky gut, SIBO, and inflammatory markers, prescribing targeted nutraceuticals and dietary protocols to restore digestive equilibrium.",
            badges: [
                "GI-MAP Comprehensive Stool Testing",
                "Food Sensitivity & Intolerance Panels",
                "Gut Barrier Repair Protocols"
            ],
            presetTreatment: "Gut Health"
        },
        aging: {
            category: "RECOMMENDED PROTOCOL: LONGEVITY & CELLULAR HEALTH",
            title: "Longevity & Healthspan Optimization",
            description: "Extend your vitality, biological age, and cellular resilience with epigenetic age testing, NAD+ restoration, senolytic compounds, and cardiovascular risk marker screening.",
            badges: [
                "Biological Age Biomarker Panels",
                "High-Dose NAD+ IV Infusions",
                "Cardiometabolic Risk Profiling"
            ],
            presetTreatment: "Regenerative & Longevity"
        },
        performance: {
            category: "RECOMMENDED PROTOCOL: RECOVERY & RESILIENCE",
            title: "Performance & Rapid Recovery Care",
            description: "Designed for active professionals and athletes. Optimize tissue repair, accelerate lactate clearance, and reduce systemic inflammation through specialized peptide therapies and amino acid IVs.",
            badges: [
                "Recovery IV Cocktails",
                "Peptide Therapy (BPC-157 / TB-500)",
                "Inflammation Biomarker Panels"
            ],
            presetTreatment: "IV Therapy"
        },
        skin: {
            category: "RECOMMENDED PROTOCOL: INTEGRATIVE AESTHETICS",
            title: "Natural Facial Rejuvenation & Skin Health",
            description: "Bridging clinical aesthetics with whole-body wellness. Rejuvenate cellular collagen, skin elasticity, and texture from the inside out and the outside in.",
            badges: [
                "PRP & Microneedling Therapies",
                "Collagen-Stimulating Bioremodelling",
                "Internal Antioxidant Support"
            ],
            presetTreatment: "Aesthetic Medicine"
        }
    };

    // 2. Symptom / Goal Interaction Logic
    const goalPills = document.querySelectorAll('.goal-pill');
    const resultCategory = document.getElementById('resultCategory');
    const resultTitle = document.getElementById('resultTitle');
    const resultDesc = document.getElementById('resultDesc');
    const resultBadges = document.getElementById('resultBadges');
    const resultBookBtn = document.getElementById('resultBookBtn');

    let currentPreset = "General Consultation";

    goalPills.forEach(pill => {
        pill.addEventListener('click', () => {
            goalPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const goalKey = pill.getAttribute('data-goal');
            const data = goalData[goalKey];

            if (data) {
                // Smooth transition
                const panel = document.getElementById('symptomResult');
                panel.style.opacity = '0.3';
                
                setTimeout(() => {
                    resultCategory.textContent = data.category;
                    resultTitle.textContent = data.title;
                    resultDesc.textContent = data.description;
                    currentPreset = data.presetTreatment;

                    // Rebuild badges
                    resultBadges.innerHTML = data.badges.map(b => 
                        `<span class="res-badge"><i data-lucide="check"></i> ${b}</span>`
                    ).join('');

                    if (window.lucide) {
                        lucide.createIcons();
                    }
                    panel.style.opacity = '1';
                }, 150);
            }
        });
    });

    // 3. Consultation Modal Logic
    const modal = document.getElementById('consultationModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOpenBtns = document.querySelectorAll('.open-modal-btn');
    const interestSelect = document.getElementById('interestTreatment');
    const consultationForm = document.getElementById('consultationForm');
    const toast = document.getElementById('toastNotification');

    function openModal(preset) {
        if (preset && interestSelect) {
            // Find match
            for (let i = 0; i < interestSelect.options.length; i++) {
                if (interestSelect.options[i].value.toLowerCase().includes(preset.toLowerCase()) || 
                    preset.toLowerCase().includes(interestSelect.options[i].value.toLowerCase())) {
                    interestSelect.selectedIndex = i;
                    break;
                }
            }
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const preset = btn.getAttribute('data-preset') || currentPreset;
            openModal(preset);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 4. Form Submission Handling
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = consultationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Submitting...`;

            setTimeout(() => {
                closeModal();
                consultationForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Show toast notification
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 4500);
                }
            }, 800);
        });
    }

    // 5. Header Elevation on Scroll
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.06)';
            header.style.padding = '0.85rem 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '1.1rem 0';
        }
    });

    // 6. Testimonials Carousel Controls
    const testiTrack = document.getElementById('testimonialsTrack');
    const testiPrev = document.getElementById('testiPrev');
    const testiNext = document.getElementById('testiNext');

    if (testiPrev && testiNext && testiTrack) {
        testiPrev.addEventListener('click', () => {
            const card = testiTrack.querySelector('.testimonial-card');
            const scrollDistance = card ? card.offsetWidth + 24 : 320;
            testiTrack.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
        });
        testiNext.addEventListener('click', () => {
            const card = testiTrack.querySelector('.testimonial-card');
            const scrollDistance = card ? card.offsetWidth + 24 : 320;
            testiTrack.scrollBy({ left: scrollDistance, behavior: 'smooth' });
        });
    }

    // Treatment Carousel Controls (if active)
    const treatmentGrid = document.getElementById('treatmentsGrid');
    const treatPrev = document.getElementById('treatmentPrev');
    const treatNext = document.getElementById('treatmentNext');

    if (treatPrev && treatNext && treatmentGrid) {
        treatPrev.addEventListener('click', () => {
            treatmentGrid.scrollBy({ left: -320, behavior: 'smooth' });
        });
        treatNext.addEventListener('click', () => {
            treatmentGrid.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    // 7. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('is-open');
            mobileToggle.classList.toggle('is-active');
        });

        // Close menu when clicking on any nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                mobileToggle.classList.remove('is-active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                mainNav.classList.remove('is-open');
                mobileToggle.classList.remove('is-active');
            }
        });
    }
});
