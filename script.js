document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    const skillItems = document.querySelectorAll('.skill-item');
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Initialize EmailJS
    emailjs.init("UYGm364oouCsOleC8"); // EmailJSの公開キーを設定

    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (name && email && message) {
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '送信中...';
            submitBtn.disabled = true;

            // Send email using EmailJS
            emailjs.send("service_dxjb517", "template_by3wlbc", {
                from_name: name,
                from_email: email,
                message: message,
                to_email: "bechan.lx250e@gmail.com"
            })
            .then(function(response) {
                alert('メールが正常に送信されました！ご連絡いただきありがとうございます。');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('送信エラー:', error);
                alert('送信に失敗しました。しばらく後にもう一度お試しください。');
            })
            .finally(function() {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        } else {
            alert('すべての項目を入力してください。');
        }
    });

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Responsive image swapping based on screen size
    function updateProjectImages() {
        const projectImages = document.querySelectorAll('.project-img');
        const isMobile = window.innerWidth <= 480;
        
        projectImages.forEach(img => {
            const originalSrc = img.src;
            
            if (originalSrc.includes('project-corporate')) {
                if (isMobile) {
                    img.src = 'images/project-corporate-mobile.svg';
                } else {
                    img.src = 'images/project-corporate-pc.svg';
                }
            } else if (originalSrc.includes('project-landing')) {
                if (isMobile) {
                    img.src = 'images/project-landing-mobile.svg';
                } else {
                    img.src = 'images/project-landing-pc.svg';
                }
            } else if (originalSrc.includes('project-portfolio')) {
                if (isMobile) {
                    img.src = 'images/project-portfolio-mobile.svg';
                } else {
                    img.src = 'images/project-portfolio-pc.svg';
                }
            }
        });
    }

    // Initial image update
    updateProjectImages();

    // Update images on window resize
    window.addEventListener('resize', updateProjectImages);
});