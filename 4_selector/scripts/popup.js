(() => {
    "use strict"
    window.onload = () => {
        setTimeout(() => {
            document.querySelector('.veil').classList.remove('none');
        }, 3000);
    };

    document.querySelector('.popup_open').addEventListener('click', () => {
        setTimeout(() => {
            document.querySelector('.veil').classList.remove('none');
        });
    });

    const closeButtons = document.querySelectorAll('.popup_close');
    closeButtons.forEach((el) => {
        el.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget || evt.target.closest('.cross')) {
                document.querySelector('.veil').classList.add('none');
            }
        });
    });
})();
