document.addEventListener('DOMContentLoaded', function() {
    let stockCount = 23;
    
    const updateStockCount = () => {
        const stockElements = document.querySelectorAll('#stock-count, #stock-count-2');
        stockElements.forEach(element => {
            element.textContent = stockCount;
        });
        
        if (stockCount > 0) {
            stockCount--;
            setTimeout(updateStockCount, Math.random() * 30000 + 30000);
        }
    };
    
    setTimeout(updateStockCount, 5000);

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

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

    const animateElements = document.querySelectorAll('.feature-card, .problem-item, .testimonial-card, .spec-row');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    const statNumbers = document.querySelectorAll('.stat-number');
    const countUp = (element, target, suffix = '') => {
        let count = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                if (suffix === '/5') {
                    element.textContent = target + suffix;
                } else {
                    element.textContent = target + suffix;
                }
                clearInterval(timer);
            } else {
                if (suffix === '/5') {
                    element.textContent = (count / 10).toFixed(1) + suffix;
                } else {
                    element.textContent = Math.floor(count) + suffix;
                }
            }
        }, 20);
    };

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                if (value.includes('98')) {
                    countUp(target, 98, '%');
                } else if (value.includes('95')) {
                    countUp(target, 95, '%');
                } else if (value.includes('4.8')) {
                    countUp(target, 48, '/5');
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    const orderForm = document.querySelector('.order-form');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(orderForm);
        const lastName = formData.get('lastName');
        const firstName = formData.get('firstName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const zipCode = formData.get('zipCode');
        const address = formData.get('address');
        const paymentMethod = formData.get('paymentMethod');

        if (lastName && firstName && email && phone && zipCode && address && paymentMethod) {
            alert(`${lastName} ${firstName}様\n\nご注文ありがとうございます！\n\n注文内容：EcoClean スターターセット\n価格：¥59,800（税込・送料無料）\n\n3営業日以内に発送いたします。\n追跡番号は別途メールでご連絡いたします。`);
            orderForm.reset();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            alert('すべての必須項目を入力してください。');
        }
    });

    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const updateCountdown = () => {
            const now = new Date();
            const endTime = new Date(now.getTime() + (2 * 24 + 14) * 60 * 60 * 1000 + 32 * 60 * 1000);
            const timeDiff = endTime - now;
            
            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                
                countdownElement.textContent = `残り ${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
            } else {
                countdownElement.textContent = "終了しました";
            }
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    const navbar = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    const floatingFeatures = document.querySelectorAll('.floating-feature');
    floatingFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.5}s`;
    });

    const heroFeatures = document.querySelectorAll('.hero-features .feature-item');
    heroFeatures.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.2}s`;
        feature.style.opacity = '0';
        feature.style.animation = 'slideInUp 0.6s ease forwards';
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    const ctaButtons = document.querySelectorAll('.cta-button, .order-button, .final-cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 35px rgba(255, 107, 53, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.3)';
        });
    });
});