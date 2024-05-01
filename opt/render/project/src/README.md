# Plataforma 5 - Backoffice API

This is the project for some company backoffice.

RESTful API hecha con [NodeJS](https://nodejs.org/es).

## Tech Stack

- Postgres
- Docker
- Express (Routing)
- SQL

Solo hace falta GIT y Docker para correr el proyecto.

## Usage

#### Cloná el repositorio (si no lo hiciste)

```bash
# ssh is highly recomended
git clone https://github.com/marisolYelamo/backOffice-api.git
```

#### Copiá el ejemplo de `.env` y pedi la data real si necesitas conectarte a otro servicio

```
cp .env.example .env
```

#### Build and run con docker.

```bash
# setup docker-compose (build local-server)
docker-compose build

# run docker images (db and server)
docker-compose up
```

Al momento de crear la imagen se carga un dump con data.

Podes usar este usuario de entrada:

- Test User:
  **email**: superadmin@plataforma5.la
  **pass**: superadmin1234

\_Recomendado crear tu propio usuario a través de Postman.

## Envs & Config

Las variables de entorno necesarias estan validadadas en la carpeta `config`.

Todos los proyectos deberían apuntar a los entornos de dev a la hora de interactuar con otro servicio
esta api no tiene otra interacciones mas que los servicios de terceros que usamos y otros productos de la empresa

- Plataforma educativa
- Landing de ventas(sólo para recibir pedidos de ella)

### Generar la documentación o ver el detalle de cada ruta

Podés ver el archivo de Swagger [acá](https://app.swaggerhub.com/apis/nahuelbonader/Backoffice/1.0.0-oas3)

También podés generar la documentación con JSdoc corriendo:

```bash
npm run build-doc
```

Luego abrí el out/index.html en el browser para ver el resultado

Para ver el diagrama de la base de datos ingresá [acá](https://dbdiagram.io/d/6168430c940c4c4eec95d124)

### Correr los tests

Los archivos de tests están siendo implementados en la misma carpeta que el archivo que se busca testear.

Para correr unit tests:

```bash
docker-compose up test
```

Para correr tests de integración

```bash
docker-compose up integration-test
```
