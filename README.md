# Segar-Backend

## API Endpoints

### Predictions

- Path : `/api/v1/vegetables/predictions`
- Method : `POST`
- Example Response :

```json
{
  "error": false,
  "message": "Image uploaded & prediction made",
  "data": {
    "_id": "0001",
    "name": "sawi",
    "score": 80,
    "image": "sawi.png",
    "createdAt": "2023-05-19T14:27:07.394+00:00"
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
    "name": "sawi",
    "score": 80,
    "image": "sawi.png",
    "createdAt": "2023-05-19T14:27:07.394+00:00"
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
      "score": 80,
      "image": "sawi.png",
      "createdAt": "2023-05-19T14:27:07.394+00:00"
    },
    {
      "_id": "0002",
      "name": "Tomat",
      "score": 80,
      "image": "tomat.png",
      "createdAt": "2023-05-19T14:27:07.394+00:00"
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
- Example Response :

```json
{
  "error": false,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
  }
}
```

### Register

- Path : `/api/v1/auth/register`
- Method : `POST`
- Example Response :

```json
{
  "error": false,
  "message": "User registered",
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
    "joinedAt": "2023-05-30T04:20:30.304+00:00",
  }
}
```

### Edit User Data

- Path : `/api/v1/auth/user/edit`
- Method : `POST`
- Example Response :

```json
{
  "error": false,
  "message": "Data has been edited",
}
```