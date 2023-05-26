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
    "predictions": "Sawi",
    "score": 80 ,
    "image": "sawi.png",
    "createdAt":"2023-05-19T14:27:07.394+00:00"
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
  "message": "Prediction fetched successfully",
  "data": {
    "_id": "0001",
    "name": "sawi",
    "predictions": "",
    "score": 80 ,
    "image": "sawi.png",
    "createdAt":"2023-05-19T14:27:07.394+00:00"
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
      "predictions": "",
      "image": "sawi.png",
      "score": 80 ,
      "createdAt": "2023-05-19T14:27:07.394+00:00"
    },
    {
      "_id": "0002",
      "name": "Tomat",
      "predictions": "",
      "score": 80 ,
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

