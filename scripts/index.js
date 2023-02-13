const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



//Функции открытия и закрытия попапа
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
}
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
}

// ---------форма изменения профиля-------------

//находим секцию, где отображены данные профиля
const profile = document.querySelector('.profile');
//находим попап с формой профиля
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
// кнопка открытия попапа профиля
const popupProfileOpenButton = document.querySelector('.profile__edit');
// кнопка закрытия попапа профиля
const popupCloseButton = editProfilePopup.querySelector('.popup__close');
// Выберите элементы, где выводятся значения полей
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__occupation');
// Находим форму изменения профиля
const formProfileElement = editProfilePopup.querySelector('.popup__form');
// Находим поля изменения профиля формы
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_occupation');

// ---------функция изменения профиля-------------
const openProfile = function() {
  openPopup(editProfilePopup);
  // подставляем в поля всплывающей формы старые значения
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Обработчик «отправки» формы для профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editProfilePopup);
}
// Назначаем Обработчик  для кнопки открытия профиля
popupProfileOpenButton.addEventListener('click', openProfile);
// Назначаем Обработчик  для кнопки закрытия профиля
popupCloseButton.addEventListener('click', function(){ closePopup(editProfilePopup)});
// Назначаем Обработчик «отправки» формы для профиля
formProfileElement.addEventListener('submit', formSubmitHandler);

// ---------попап формы добавления карточки-------------

const popupAdd = document.querySelector('.popup_type_add-place');
// Находим форму  добавления карточки
const formAdd = popupAdd.querySelector('.popup__form');
// кнопки октрытия закрытия формы добавления  карточки-------------
const popupAddOpenButton = document.querySelector('.profile__add-button');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');
//  обработчик для кнопок добавления и удаления карточки-------------
popupAddOpenButton.addEventListener('click', function(){openPopup(popupAdd)});
popupAddCloseButton.addEventListener('click', function(){closePopup(popupAdd)});
//поля для ввода данных карточки
const cardInputPlace = popupAdd.querySelector('.popup__input_type_place');
const cardInputImg = popupAdd.querySelector('.popup__input_type_link');

// Функция отправки формы добавления карточки
function formAddSubmitHandler(evt) {
  evt.preventDefault();
  // создание новой карточки
  const card = createCard({name: cardInputPlace.value, link: cardInputImg.value});
  // добавление новой карточки
  cardList.prepend(card);
  formAdd.reset();
  closePopup(popupAdd);
}

// Прикрепляем обработчик добавления карточки к форме:  событием “submit” «отправка»
formAdd.addEventListener('submit', formAddSubmitHandler);

//Создание карточек
const cardList = document.querySelector('.cards__list');
const cardTmpItem = document.querySelector('.template');
//Функция создания карточек
function createCard(item){
  const newItem = cardTmpItem.content.cloneNode(true);

  const cardRegion = newItem.querySelector('.cards__region');
  cardRegion.textContent = item.name;

  const cardImg = newItem.querySelector('.cards__img');
  cardImg.setAttribute('src', item.link);
  cardImg.setAttribute('alt', item.name);

  const cardDeleteButton = newItem.querySelector('.cards__delete-button');
  cardDeleteButton.addEventListener('click', deleteCard);

  const cardLikeButton = newItem.querySelector('.cards__like-button');
  cardLikeButton.addEventListener('click', likeCard);

  cardImg.addEventListener('click', openCard);

  return newItem;
}

initialCards.forEach(function(item) {
  cardList.append(createCard(item));
})

// --------- удаление карточки-------------

function deleteCard(evt){
  const targetButton = evt.target;
  const targetCard = targetButton.closest('.cards__item');
  targetCard.remove();
}

// --------- лайк карточки-------------

function likeCard(evt){
  const targetButton = evt.target;
  targetButton.classList.toggle('cards__like-button_active');
  targetButton.classList.toggle('cards__like-button_defoult');
}

// --------- открытие карточки-------------

// Получаем  попапа для открытия изобаражения
const popupImg = document.querySelector('.popup_type_open-card');
// Получаем  кнопку закрытия изображения из попапа
const popupImgСlose =  popupImg.querySelector('.popup__close');
// Вешаем обработчик для закрытия изображения из попапа
popupImgСlose.addEventListener('click', function(){closePopup(popupImg)});
// Получаем  конейнер-изображения из попапа
const popupImgImg =  popupImg.querySelector('.popup-img__img');
// Контейнер для подписи изображения в попапе
const popupImgTitle =  popupImg.querySelector('.popup-img__title');

function openCard(evt){
  const targetImg = evt.target;
// Получаем карточку целевого изображения
  const itemParent = targetImg.closest('.cards__item');
// Получаем  изображение из карточки
  const itemImg =  itemParent.querySelector('.cards__img');
// Получаем атрибуты изображения из карточки
  const itemImgSrc = itemImg.getAttribute('src');
  const itemImgAlt = itemImg.getAttribute('alt');

  openPopup(popupImg);

// Добавляем атрибуты изображения из карточки в попап
  popupImgImg.setAttribute('src', itemImgSrc);
  popupImgImg.setAttribute('alt', itemImgAlt);

// Подписи изображения в попапе из подписи карточки
  popupImgTitle.textContent =  itemParent.querySelector('.cards__region').textContent;
}
