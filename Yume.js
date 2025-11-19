function initTabSystem() {
	const tabLinks = document.querySelectorAll('.tab-link');
	const tabContents = document.querySelectorAll('.tab-content');

	function showTab(targetTab) {
		tabContents.forEach(content => content.classList.remove('active'));
		tabLinks.forEach(link => link.classList.remove('active'));

		const targetContent = document.getElementById(targetTab);
		if (targetContent) {
			targetContent.classList.add('active');
		}

		document.querySelectorAll(`[data-tab="${targetTab}"]`).forEach(link => {
			link.classList.add('active');
		});
	}


	tabLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetTab = link.getAttribute('data-tab');
			showTab(targetTab);
		});
	});
}
// Mobile menu toggle
function initMobileMenu() {
	const mobileToggle = document.getElementById('mobile-toggle');
	const mobileMenu = document.getElementById('mobile-menu');

	mobileToggle.addEventListener('click', () => {
		mobileMenu.classList.toggle('active');
		mobileToggle.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
	});

	// Close mobile menu when clicking on a link (mobile scroll behavior)
	document.querySelectorAll('.mobile-menu a').forEach(link => {
		link.addEventListener('click', () => {
			mobileMenu.classList.remove('active');
			mobileToggle.textContent = '☰';
			
			// On mobile, scroll to section instead of tab switching
			const href = link.getAttribute('href');
			if (href.startsWith('#')) {
				const target = document.querySelector(href);
				if (target) {
					target.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			}
		});
	});

	// Close mobile menu when clicking outside
	document.addEventListener('click', (e) => {
		if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
			mobileMenu.classList.remove('active');
			mobileToggle.textContent = '☰';
		}
	});
}

// Team filter functionality
function initTeamFilters() {
	const filterButtons = document.querySelectorAll('.filter-btn');
	const teamMembers = document.querySelectorAll('.team-member');

	filterButtons.forEach(button => {
		button.addEventListener('click', () => {
			// Remove active class from all buttons
			filterButtons.forEach(btn => btn.classList.remove('active'));
			// Add active class to clicked button
			button.classList.add('active');

			const filterValue = button.getAttribute('data-filter');

			teamMembers.forEach(member => {
				if (filterValue === 'all') {
					member.classList.remove('hidden');
					setTimeout(() => {
						member.style.opacity = '1';
						member.style.transform = 'scale(1)';
					}, 100);
				} else if (member.getAttribute('data-category') === filterValue) {
					member.classList.remove('hidden');
					setTimeout(() => {
						member.style.opacity = '1';
						member.style.transform = 'scale(1)';
					}, 100);
				} else {
					member.style.opacity = '0';
					member.style.transform = 'scale(0.8)';
					setTimeout(() => {
						member.classList.add('hidden');
					}, 300);
				}
			});
		});
	});
}

// Newsletter form handling
function initNewsletterForms() {
	document.querySelectorAll('form[name="newsletter"], form[name="support-newsletter"]').forEach(form => {
		form.addEventListener('submit', function(e) {
			const email = this.querySelector('input[name="email"]').value;
			if (email) {
				alert('Grazie per la tua iscrizione! Riceverai presto i nostri aggiornamenti.');
			}
		});
	});
}

// Tipeee integration placeholder
function initTipeeeButton() {
	const tipeeeLink = document.getElementById('tipeee-link');
	if (tipeeeLink) {
		tipeeeLink.addEventListener('click', function(e) {
			e.preventDefault();
			alert('Link Tipeee da configurare. Inserisci il tuo URL Tipeee nell\'href di questo bottone.');
		});
	}
}

// Scroll progress indicator for mobile
function initScrollIndicator() {
	window.addEventListener('scroll', () => {
		const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
		const indicator = document.querySelector('.scroll-indicator');
		if (indicator) {
			indicator.style.transform = `scaleX(${scrollProgress})`;
		}
	});
}

function initResponsiveBehavior() {
	function handleResize() {
		const isMobile = matchMedia('(max-width: 768px)').matches;
		
		if (isMobile) {
			// Mobile → mostro tutte le sezioni
			document.querySelectorAll('.tab-content').forEach(content => {
				content.classList.add('active'); // tutte attive per scroll unico
			});
		} else {
			// Desktop → solo quella attualmente attiva rimane
			const activeTab = document.querySelector('.tab-link.active')?.dataset.tab;
			document.querySelectorAll('.tab-content').forEach(content => {
				if (content.id === activeTab) {
					content.classList.add('active');
				} else {
					content.classList.remove('active');
				}
			});
		}
	}

	handleResize();
	window.addEventListener('resize', handleResize);
}



// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
	initTabSystem();
	initMobileMenu();
	initTeamFilters();
	initNewsletterForms();
	initTipeeeButton();
	initScrollIndicator();
	initResponsiveBehavior();
});


// ====== THEME SWITCHER ======

// Elementi DOM
const themeToggle = document.querySelector(".theme-toggle");
const themeDropdown = document.querySelector(".theme-dropdown");
const themeItems = document.querySelectorAll(".theme-dropdown li");

// Apri/chiudi dropdown
themeToggle.addEventListener("click", () => {
    themeDropdown.classList.toggle("active");
});

// Chiudi cliccando fuori
document.addEventListener("click", (e) => {
    if (!themeToggle.contains(e.target) && !themeDropdown.contains(e.target)) {
        themeDropdown.classList.remove("active");
    }
});

// Mappa corretta dei file CSS
const themeFiles = {
    yume: "Yume.css",
    yume1: "Yume1.css",
    yume2: "Yume2.css",
    yume3: "Yume3.css",
    yume4: "Yume4.css"
};

// Cambio tema
themeItems.forEach(item => {
    item.addEventListener("click", () => {

        const selected = item.dataset.theme;
        const cssFile = themeFiles[selected];

        // Cambia file css
        const link = document.getElementById("theme-style");
        link.href = cssFile;

        // Salva preferenza
        localStorage.setItem("selectedTheme", cssFile);

        // Chiudi menu
        themeDropdown.classList.remove("active");
    });
});

// Ripristina tema al caricamento
window.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("selectedTheme");
    if (saved) document.getElementById("theme-style").href = saved;
});
