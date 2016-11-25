# jsonschema-builder
Command line tool for `mongoose-schema-jsonschema`

The tool puts to standard output stream the json schema or an array of such
schemas.

It supports two formats for resulting schemas:
 - javascript (produced by `console.dir(...)`)
 - json (produced by `JSON.stringify()`)


## Installation
```shell
npm i -g jsonschema-builder
```

## Usage

Getting options:
```shell
jsonschema-builder --help
```

Output:
```shell
  Usage: index [options] <pathToModels>

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -j, --json     JSON format for output
    -n, --noid     Removes id field from resulting schema
```

## Samples

Guessing you have some module with a model definition:
```shell
'use strict';
// models.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {type: String, required: true},
  year: Number,
  author: {type: Schema.Types.ObjectId, required: true, ref: 'Person'}
});

const PersonSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: Date
});

module.exports = exports = {
  Book: mongoose.model('Book', BookSchema),
  Person: mongoose.model('Person', PersonSchema)
};
```

Building json schema in javascript-object format:
```shell
jsonschema-builder ./models
```

Output:
```javascript
[ { id: '#book',
    title: 'Book',
    type: 'object',
    properties:
     { title: { type: 'string' },
       year: { type: 'number' },
       author:
        { type: 'string',
          'x-ref': 'Person',
          description: 'Refers to Person',
          format: 'uuid',
          pattern: '^[0-9a-fA-F]{24}$' },
       _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
       __v: { type: 'number' } },
    required: [ 'title', 'author' ] },
  { id: '#person',
    title: 'Person',
    type: 'object',
    properties:
     { firstName: { type: 'string' },
       lastName: { type: 'string' },
       dateOfBirth: { type: 'string', format: 'date-time' },
       _id: { type: 'string', format: 'uuid', pattern: '^[0-9a-fA-F]{24}$' },
       __v: { type: 'number' } },
    required: [ 'firstName', 'lastName' ] } ]
```

The same case with JSON formatted output
```shell
jsonschema-builder --json ./models
```

Output:
```javascript
[
  {
    "id": "#book",
    "title": "Book",
    "type": "object",
    "properties": {
      "title": {
        "type": "string"
      },
      "year": {
        "type": "number"
      },
      "author": {
        "type": "string",
        "x-ref": "Person",
        "description": "Refers to Person",
        "format": "uuid",
        "pattern": "^[0-9a-fA-F]{24}$"
      },
      "_id": {
        "type": "string",
        "format": "uuid",
        "pattern": "^[0-9a-fA-F]{24}$"
      },
      "__v": {
        "type": "number"
      }
    },
    "required": [
      "title",
      "author"
    ]
  },
  {
    "id": "#person",
    "title": "Person",
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      },
      "dateOfBirth": {
        "type": "string",
        "format": "date-time"
      },
      "_id": {
        "type": "string",
        "format": "uuid",
        "pattern": "^[0-9a-fA-F]{24}$"
      },
      "__v": {
        "type": "number"
      }
    },
    "required": [
      "firstName",
      "lastName"
    ]
  }
]
```
The module is passing to the tool could also export single instance of
`Mongoose.Model` or an array of such instances.

Single instance:
```javascript
'use strict';
//book.js

module.exports = exports = require('./models').Book;
```

Building schema for single model:
```shell
jsonschema-builder -j ./book > book.json
```

Opening `book.json`:
```javascript
{
  "title": "Book",
  "type": "object",
  "properties": {
    "title": {
      "type": "string"
    },
    "year": {
      "type": "number"
    },
    "author": {
      "type": "string",
      "x-ref": "Person",
      "description": "Refers to Person",
      "format": "uuid",
      "pattern": "^[0-9a-fA-F]{24}$"
    },
    "_id": {
      "type": "string",
      "format": "uuid",
      "pattern": "^[0-9a-fA-F]{24}$"
    },
    "__v": {
      "type": "number"
    }
  },
  "required": [
    "title",
    "author"
  ]
}
```

Array of models:
```javascript
'use strict';
//list.js

const models = require('./models');

module.exports = exports = [
  models.Book, models.Person
];
```

Building schema for single model:
```shell
jsonschema-builder -j ./list > models.json
```

Opening `models.json`:
```javascript
[
  {
    "title": "Book",
    "type": "object",
    "properties": {
      "title": {
        "type": "string"
      },
      "year": {
        "type": "number"
      },
      "author": {
        "type": "string",
        "x-ref": "Person",
        "description": "Refers to Person",
        "format": "uuid",
        "pattern": "^[0-9a-fA-F]{24}$"
      },
      "_id": {
        "type": "string",
        "format": "uuid",
        "pattern": "^[0-9a-fA-F]{24}$"
      },
      "__v": {
        "type": "number"
      }
    },
    "required": [
      "title",
      "author"
    ]
  },
  {
    "title": "Person",
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type": "string"
      },
      "dateOfBirth": {
        "type": "string",
        "format": "date-time"
      },
      "_id": {
        "type": "string",
        "format": "uuid",
        "pattern": "^[0-9a-fA-F]{24}$"
      },
      "__v": {
        "type": "number"
      }
    },
    "required": [
      "firstName",
      "lastName"
    ]
  }
]
```

Please note that the result for the array of models is different from the result
for the first case when the models are exported by an object.

In the first case (exports as an object) the tool adds the `id` field to the
resulting json schema. To avoid this behavior use `--noid` option.


## Customization

The tool is just a command line interface for node-module `mongoose-schema-jsonschema`.
So you could to import mentioned above module to your project and use it directly.

```shell
npm install mongoose-schema-jsonschema
```

More details by the link
[mongoose-schema-jsonschema](https://www.npmjs.com/package/mongoose-schema-jsonschema)
