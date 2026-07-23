document.addEventListener('DOMContentLoaded', () => {
    
    // --- Carousel Slider Logic ---
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

    // --- Scroll Reveal Animation Observer ---
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

    // --- Product Details Modal Logic ---
    const modal = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const body = document.body;

    // Elements inside the modal to update
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDesc = document.getElementById('modal-desc');
    const modalNotes = document.getElementById('modal-notes-text');
    const modalBuyBtn = document.getElementById('modal-buy-btn');

    // Open Modal Function
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent page from jumping to top
            
            // Get data from the clicked button
            const title = btn.getAttribute('data-title');
            const price = btn.getAttribute('data-price');
            const notes = btn.getAttribute('data-notes');
            const desc = btn.getAttribute('data-desc');
            const imageSrc = btn.getAttribute('data-image');

            // Inject data into the modal
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            modalNotes.textContent = notes;
            modalDesc.textContent = desc;
            modalImg.style.backgroundImage = `url('${imageSrc}')`;

            // Show modal and prevent body scrolling
            modal.classList.add('active');
            body.classList.add('modal-open');
        });
    });

    // Close Modal Function
    const closeModal = () => {
        modal.classList.remove('active');
        body.classList.remove('modal-open');
    };

    // Close via X button
    closeModalBtn.addEventListener('click', closeModal);

    // Close when clicking the "Inquire Now" button
    modalBuyBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal content (on the dark overlay)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
