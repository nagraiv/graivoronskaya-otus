(() => {
    "use strict"

    // у невалидной формы кнопка disabled
    document.querySelector('.popup_form').addEventListener('input', event => {
        const formEl = event.target.form;
        const isValid = formEl.checkValidity();
        formEl.querySelector('.btn_accent').disabled = !isValid;
    });

    // меняем стрелочку у открытого select через data-атрибут
    document.querySelector('select').addEventListener('click', event => {
        if (event.target.dataset.state === 'active') {
            event.target.dataset.state = '';
        } else {
            event.target.dataset.state = 'active';
        }
    });

    document.querySelector('select').addEventListener('blur', event => {
        event.target.dataset.state = '';
    });

    // превью загруженного изображения
    const inputFile = document.querySelector('input[type=file]');

    inputFile.onchange = evt => {
        const uploaded = document.getElementById('uploaded');
        uploaded.innerHTML = `<img src="${URL.createObjectURL(evt.target.files[0])}" class="user_logo" alt="">
                    <div class="img__remove"></div>`;
        uploaded.onload = () => {
            URL.revokeObjectURL(uploaded.src);
        }

        uploaded.querySelector('.img__remove').onclick = () => {
            uploaded.innerHTML= '';
        };
    }

    // загрузка файлов через drag&drop
    const dropContainer = document.querySelector('.form__input-file');

    dropContainer.ondragover = evt => {
        evt.preventDefault();
    };

    dropContainer.ondragenter = evt => {
        evt.preventDefault();
    };

    dropContainer.ondrop = evt => {
        evt.preventDefault();

        const uploaded = document.getElementById('uploaded');
        uploaded.innerHTML = `<img src="${URL.createObjectURL(evt.dataTransfer.files[0])}" class="user_logo" alt="">
                    <div class="img__remove"></div>`;
        uploaded.onload = () => {
            URL.revokeObjectURL(uploaded.src);
        }

        uploaded.querySelector('.img__remove').onclick = () => {
            uploaded.innerHTML= '';
        };
    }
})();
