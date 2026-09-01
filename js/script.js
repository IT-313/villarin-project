document.addEventListener('DOMContentLoaded', () => {
    
    // Carousel Slider Logic
    const track = document.getElementById('scent-track');
    const btnLeft = document.getElementById('slide-left');
    const btnRight = document.getElementById('slide-right');

    if (track && btnLeft && btnRight) {
        btnLeft.addEventListener('click', () => {
            const cardWidth = track.querySelector('.product-card').offsetWidth;
            track.scrollBy({ left: -(cardWidth + 40), behavior: 'smooth' }); 
        });

        btnRight.addEventListener('click', () => {
            const cardWidth = track.querySelector('.product-card').offsetWidth;
            track.scrollBy({ left: (cardWidth + 40), behavior: 'smooth' });
        });
    }

    // Scroll Reveal Animation Observer
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Product Details Modal Logic 
    const bsModalElement = document.getElementById('productModal');
    const bsModal = new bootstrap.Modal(bsModalElement);
    
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const modalNotes = document.getElementById('modal-notes-text');
    const modalBuyBtn = document.getElementById('modal-buy-btn');

    // Open Modal Function
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            // Inject data into the modal
            modalTitle.textContent = btn.getAttribute('data-title');
            modalPrice.textContent = btn.getAttribute('data-price');
            modalNotes.textContent = btn.getAttribute('data-notes');
            modalDesc.textContent = btn.getAttribute('data-desc');
            modalImg.style.backgroundImage = `url('${btn.getAttribute('data-image')}')`;

            bsModal.show();
        });
    });

    // Handle "Inquire Now" Button 
    if (modalBuyBtn) {
        modalBuyBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            bsModal.hide(); // Close modal
            
            // Wait for fade transition, then scroll to Contact section
            setTimeout(() => {
                const contactSection = document.getElementById('contact-us');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 350); 
        });
    }
});
