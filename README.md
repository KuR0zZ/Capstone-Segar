# Segar-Backend

## Related Projects

- Machine Learning Models
  - https://colab.research.google.com/drive/1ndBqUdoqqWPaXkHvzJDeX_y-gNCHciPN?usp=sharing
  - https://colab.research.google.com/drive/1CjNdrBqKWtYUv1JybFz2ztCYU1Vdvi9w?usp=sharing
- Android Respository
  - https://github.com/EBP78/segar

## Requirements

- Visual Studio Code
- Node.js v18
- NPM v8.19.2
- MongoDB Atlas Account

Resources needed:

- https://code.visualstudio.com/
- https://nodejs.org/en
- https://www.mongodb.com/atlas/database

## Pre-Installation

1. Create a cloud storage bucket and set the bucket to `public access`

2. Create a service account and assign the role `Storage Admin`

3. Create a service account key with `JSON` as the key type

4. Create a MongoDB cluster and get the `Connection String or URI`

Link for Reference:

- https://cloud.google.com/storage/docs/creating-buckets
- https://cloud.google.com/iam/docs/service-account-overview
- https://cloud.google.com/iam/docs/keys-create-delete#iam-service-account-keys-create-console
- https://www.mongodb.com/docs/guides/atlas/connection-string/

## Installation

1. Clone this repository by running `git clone --single-branch https://github.com/KuR0zZ/Capstone-Segar.git .`

2. Add a `.env` file by copying the content below and replace the `JWT_SECRET & MONGO_URI` with your own

```
JWT_SECRET = your_jwt_secret
VEGETABLE_NAME_MODEL = 'file://Models/Vegetables-Class/model.json'
FRESH_ROTTEN_MODEL = 'file://Models/Vegetables-Fresh-Rotten/model.json'
MONGO_URI = your_mongodb_uri
```

3. Add a `google-cloud-key.json` file and paste your service account key to it. The content will look similar to that shown below

```
{
  "type": "service_account",
  "project_id": "your_project_id",
  "private_key_id": "your_private_key_id",
  "private_key": "your_private_key",
  "client_email": "your_client_email",
  "client_id": "your_client_id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your_client_x509_cert_url",
  "universe_domain": "googleapis.com"
}
```

4. Install dependecies by running `npm install`

### Running the Application

- For production, run `npm run start`
- For development, run `npm run dev`

## API Endpoints

### Global Headers

The following is required for all API request except login endpoint:

- `Authorization`: Include a valid access token as a Bearer token for authentication purposes

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Predictions

- Path : `/api/v1/vegetables/predictions`
- Method : `POST`
- Example Request Body :

The request body should be encoded as `multipart/form-data`

| Key   | Value           |
| ----- | --------------- |
| name  | Cauliflower     |
| score | Fresh           |
| image | Cauliflower.jpg |

- Example Response :

```json
{
  "error": false,
  "message": "Image uploaded & prediction made",
  "data": {
    "_id": "0001",
    "name": "Cauliflower",
    "score": "Fresh",
    "image": "https://storage.googleapis.com/your_bucket/your_image.jpg",
    "createdAt": "2023-05-19T14:27:07.394+00:00",
    "creator": "0101"
  }
}
```

### Result

- Path : `/api/v1/vegetables/predictions/<predictionid>`
- Method : `GET`
- Example Response :

```json
{
  "error": false,
  "message": "Prediction result fetched successfully",
  "data": {
    "_id": "0001",
    "name": "Sawi",
    "score": "Fresh",
    "image": "https://storage.googleapis.com/your_bucket/your_image.jpg",
    "createdAt": "2023-05-19T14:27:07.394+00:00",
    "creator": "0101"
  }
}
```

### Predictions History

- Path : `/api/v1/vegetables/predictions`
- Method : `GET`
- Example Response :

```json
{
  "error": false,
  "message": "Predictions history fetched successfully",
  "data": [
    {
      "_id": "0001",
      "name": "Sawi",
      "score": "Fresh",
      "image": "https://storage.googleapis.com/your_bucket/your_image.jpg",
      "createdAt": "2023-05-19T14:27:07.394+00:00",
      "creator": "0101"
    },
    {
      "_id": "0002",
      "name": "Tomat",
      "score": "Rotten",
      "image": "https://storage.googleapis.com/your_bucket/your_image.jpg",
      "createdAt": "2023-05-19T14:27:07.394+00:00",
      "creator": "0101"
    }
  ]
}
```

### Vegetables Dictionary

- Path : `/api/v1/vegetables/dictionaries`
- Method : `GET`
- Example Response :

```json
{
  "error": false,
  "message": "Dictionaries fetched successfully",
  "data": [
    {
      "_id": "0001",
      "name": "Sawi",
      "scientific_name": "Brassica rapa",
      "famili": "Cruciferaceae",
      "image": "sawi.png",
      "consumable_part": "lorem ipsum"
    },
    {
      "_id": "0002",
      "name": "Tomat",
      "scientific_name": "Solanum lycopersicum",
      "famili": "Solanaceae",
      "image": "tomat.png",
      "consumable_part": "lorem ipsum"
    }
  ]
}
```

### Vegetables Dictionary Details

- Path : `/api/v1/vegetables/dictionaries/<dictionaryid>`
- Method : `GET`
- Example Response :

```json
{
  "error": false,
  "message": "Dictionary details fetched successfully",
  "data": {
    "_id": "0001",
    "name": "Sawi",
    "scientific_name": "Brassica rapa",
    "famili": "Cruciferaceae",
    "image": "sawi.png",
    "consumable_part": "lorem ipsum",
    "Origin": "China",
    "brief_desc": "Lorem ipsum dolor sit amet..."
  }
}
```

### Login

- Path : `/api/v1/auth/login`
- Method : `POST`
- Example Body Request :

```
{
  "email": "your_email@email.com",
  "password": "your_password"
}
```

- Example Response :

```json
{
  "error": false,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN"
  }
}
```

### Register

- Path : `/api/v1/auth/register`
- Method : `POST`
- Example Body Request :

```
{
  "username": "your_username",
  "email": "your_email@email.com",
  "password": "your_password"
}
```

- Example Response :

```json
{
  "error": false,
  "message": "User registered"
}
```

### Logout

- Path : `/api/v1/auth/logout`
- Method : `POST`
- Example Body Request :

```
{
  "email": "your_email@email.com"
}
```

- Example Response :

```json
{
  "error": false,
  "message": "User logged out"
}
```

### User Data

- Path : `/api/v1/auth/user`
- Method : `GET`
- Example Response :

```json
{
  "error": false,
  "message": "Data successfully decoded",
  "data": {
    "id": "647579be74489779b1e9193e",
    "username": "segar2rev3",
    "email": "segar2rev3@gmail.com",
    "joinedAt": "2023-05-30T04:20:30.304+00:00"
  }
}
```

### Edit User Data

- Path : `/api/v1/auth/user/edit`
- Method : `POST`
- Example Body Request :

```
{
  "username": "segarapp5revv",
  "email": "segarapp5@gmail.com"
}
```

- Example Response :

```json
{
  "error": false,
  "message": "Data has been edited"
}
```
