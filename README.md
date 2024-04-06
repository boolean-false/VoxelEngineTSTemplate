# VoxelEngineTSTemplate

Шаблон для создания контент-паков для [VoxelEngine](https://github.com/MihailRis/VoxelEngine-Cpp)

## Установка

У вас должен бысть установлен **NodeJS**

Для NPM
```bash
npm install
```

Для Yarn
```bash
yarn install
```

## Конфигурация

в конфигурационном файле [pack-settings.json](pack-settings.json) 
в поле ``extPath`` можно указать конечный путь до собранного контент-пака

Пример ``путь до движка/res/conten/{mod_name}`` \
`{mod_name}` подставляется автоматически из [package.json](src/package.json)

Структура контент-пака остается стандартной

## Использование

Для сборки контент-пака используем 

```bash
npm run build
```

или

```bash
yarn run build
```

## Лицензия

[MIT](https://choosealicense.com/licenses/mit/)
