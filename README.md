Общее [Frontend](https://github.com/Kukucapl/react-mesto-api-full-gha/tree/main/frontend) [Backend](https://github.com/Kukucapl/react-mesto-api-full-gha/blob/main/backend/README.md)

# Проектная работа "Mesto"

## Описание:
Приложение для обмена изображениями. Присутствует регистрация, авторизация, есть возможность редактировать профиль, ставить лайки, загружать и удалять фотографии.

## Верстка:
Верстка `адаптивная`, использованы правила `БЭМ`, структура `nested`, для выравнивания компонентов использованы `flexbox` и `grid`

## [Frontend](https://github.com/Kukucapl/react-mesto-api-full-gha/tree/main/frontend)
Приложение на `React`с тремя `роутами`: основная страница (защищенный роут), регистрация и авторизация. Взаимодействует с сервером через `API` запросы. Хранит `token` в `localStorage`.

## [Backend](https://github.com/Kukucapl/react-mesto-api-full-gha/tree/main/backend)
`express`, `mongoose`, `cors`, `JWT`, `celebrate`

## Для локального запуска
Клонируйте репозиторий `git clone https://github.com/Kukucapl/react-mesto-api-full-gha.git`
В дерикториях frontend и backend установите необходимые пакеты `npm install`
Запустите бэк `npm run dev`
И фронт `npm run start`
Поделано!

## Планируемые улучшения
Закрытие по оверлею, уточнение ошибок при регистрации и авторицации, валидация.