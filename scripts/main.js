const apiKey = 'I4HqV6VJgyavCUMdaa7rliZgrSizhaqr2NuMy85NWpQ';
const perPage = 30;

const imageWrapper = document.querySelector('.image-wrapper');
const searchInput = document.querySelector('.search');
const searchIcon = document.querySelector('.search-icon');
searchInput.focus();

const closeIcon = document.querySelector('.close');

// Добавляем обработчик фокуса на поле ввода
searchInput.addEventListener('focus', function() {
    // При фокусе, показываем иконку закрытия
    closeIcon.style.display = 'inline';
});

// Добавляем обработчик клика на иконку закрытия
closeIcon.addEventListener('click', function() {
    // При клике, очищаем поле ввода и скрываем иконку закрытия
    searchInput.value = '';
    closeIcon.style.display = 'none';
});

// Добавляем обработчик изменения значения поля ввода
searchInput.addEventListener('input', function() {
    // Если поле ввода не пустое, показываем иконку закрытия
    if (searchInput.value.trim() !== '') {
        closeIcon.style.display = 'inline';
    } else {
        // Если поле ввода пустое, скрываем иконку закрытия
        closeIcon.style.display = 'none';
    }
});



searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (searchInput.value.length === 0) {
            alert('Write something');
        } else {
            getPhotos(searchInput.value);
        }
    }
});

searchIcon.addEventListener('click', function() {
    if (searchInput.value.length === 0) {
        alert('Write something');
    } else {
        getPhotos(searchInput.value);
    }
});


function displayPhotos(photos) {
    const imageWrapper = document.querySelector('.image-wrapper');

    imageWrapper.innerHTML = '';

    photos.forEach(photo => {
        const imageElement = document.createElement('div');
        imageElement.classList.add('image');

        const img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.alt_description;


        img.addEventListener('load', () => {
            imageElement.appendChild(img);
            imageElement.appendChild(desc);
            imageWrapper.appendChild(imageElement);
        });

        const desc = document.createElement('div');
        desc.classList.add('desc');
        desc.textContent = photo.likes + ' likes' || 'No Likes';

        imageElement.appendChild(desc);


        img.src = photo.urls.regular;
        img.alt = photo.alt_description;
    });
}



async function getPhotos(query) { 
    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&client_id=${apiKey}`;
    let image = null;
    try {
        const data = await fetch(url);
        image = await data.json();
    } catch (error) {
        console.log('Error: ', error);
    }
    if (image) {
        displayPhotos(image.results);
        console.log(image.results);
    }
}

getPhotos('japan')





