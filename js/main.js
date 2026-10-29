// Rôle : interactions du site (accordéon de la FAQ, filtre du programme)

// FAQ : une seule question ouverte à la fois
document.querySelectorAll('[data-faq-toggle]').forEach((question) => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq__item');
        const wasOpen = item.classList.contains('is-open');

        document.querySelectorAll('.faq__item.is-open').forEach((openItem) => {
            openItem.classList.remove('is-open');
            openItem.querySelector('[data-faq-toggle]').setAttribute('aria-expanded', 'false');
        });

        if (!wasOpen) {
            item.classList.add('is-open');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// Programme : filtre les cartes selon la classe de thème de la scène (theme-lake…)
const filterButtons = document.querySelectorAll('[data-filter]');
const filterCount = document.querySelector('[data-filter-count]');
const programmeCards = document.querySelectorAll('.ly-section .card');

function applyFilter(scene) {
    let visible = 0;

    programmeCards.forEach((card) => {
        const match = scene === 'all' || card.classList.contains(`theme-${scene}`);
        card.classList.toggle('is-hidden', !match);
        if (match) visible++;
    });

    if (filterCount) {
        filterCount.textContent = `${visible} concert${visible > 1 ? 's' : ''} affiché${visible > 1 ? 's' : ''}`;
    }
}

filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
        filterButtons.forEach((other) => {
            other.classList.remove('is-active');
            other.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('is-active');
        button.setAttribute('aria-pressed', 'true');
        applyFilter(button.dataset.filter);
    });
});

if (filterButtons.length) {
    applyFilter('all');
}
