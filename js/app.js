// Observer les éléments pour les animer quand ils entrent dans le viewport
const items = document.querySelectorAll('.animate-item');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Délai progressif pour que les éléments arrivent l'un après l'autre
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200); // 200ms de décalage entre chaque élément

            observer.unobserve(entry.target); // On observe plus une fois animé
        }
    });
}, {
    threshold: 0.1 // Déclenche quand 10% de l'élément est visible
});

// On observe chaque élément
items.forEach(item => {
    observer.observe(item);
});

const items1 = document.querySelectorAll('.animate-item1');

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Délai progressif pour un effet en cascade
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150); // 150ms entre chaque élément – ajustable

            observer.unobserve(entry.target); // Plus besoin d'observer après
        }
    });
}, {
    threshold: 0.15, // Déclenche quand 15% de la section est visible
    rootMargin: '0px 0px -50px 0px' // Légère avance pour fluidité
});

items1.forEach(item => observer1.observe(item));

const items2 = document.querySelectorAll('.card-explain');

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Délai progressif pour un effet en cascade
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150); // 150ms entre chaque élément – ajustable

            observer.unobserve(entry.target); // Plus besoin d'observer après
        }
    });
}, {
    threshold: 0.15, // Déclenche quand 15% de la section est visible
    rootMargin: '0px 0px -50px 0px' // Légère avance pour fluidité
});

items2.forEach(item => observer2.observe(item));

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('toggleCurrency');
    const btnText = btn.querySelector('span');
    const amounts = document.querySelectorAll('.amount');
    const symbols = document.querySelectorAll('.currency-symbol');

    let isEuro = true;
    const exchangeRate = 1.75; // 1€ = 1.45 CAD

    btn.addEventListener('click', () => {
        isEuro = !isEuro;

        amounts.forEach(el => {
            const baseValue = parseFloat(el.getAttribute('data-base-price'));

            if (isEuro) {
                // Retour à l'Euro
                el.innerText = baseValue.toLocaleString('fr-FR', { minimumFractionDigits: 2 });
            } else {
                // Conversion en CAD
                const converted = (baseValue * exchangeRate).toFixed(2);
                el.innerText = converted.replace('.', ',');
            }
        });

        // Mise à jour des symboles (€ ou CAD $)
        symbols.forEach(sym => {
            sym.innerText = isEuro ? '€' : 'CAD';
        });

        // Mise à jour du texte du bouton
        btnText.innerText = isEuro ? 'CAD ($)' : 'Euro (€)';
    });
});