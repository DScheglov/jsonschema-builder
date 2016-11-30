# jsonschema-builder
Command line tool for `mongoose-schema-jsonschema`

The tool puts to standard output stream the json schema or an array of such
schemas.

It supports two formats for resulting schemas:
 - javascript (produced by `console.dir(...)`)
 - json (produced by `JSON.stringify()`)

## Contents
 * [Installation](#installation)
 * [Usage](#usage)
 * [Samples](#samples)
 * [Schema Id](#schema-id)
 * [API](#api)
 * [Contribution](#contribution)

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
Usage: jsonschema-builder [options] <pathToModels>

Options:

  -h, --help        output usage information
  -V, --version     output the version number
  -d, --dir         Process <pathToModels> as a directory
  -r, --recursive   Process directory recursively
  -j, --json        JSON format for output
  -n, --noid        Removes id field from resulting schema
  -o, --object-def  Output as json-schema definitions object
  -i, --id [style]  Style for json-schema identifiers
  --no-color        Prevents colorized output
```

## Samples

`jsonschema-builder` project includes some sample-model definitions that
located in the **samples** in the project root directory.

The structure is following

.
+-- samples
|   +-- models
    |   +-- [book.js](https://github.com/DScheglov/jsonschema-builder/blob/master/samples/models/book.js)
    |   +-- [person.js](https://github.com/DScheglov/jsonschema-builder/blob/master/samples/models/person.js)
|   +-- [list.js](https://github.com/DScheglov/jsonschema-builder/blob/master/samples/list.js)
|   +-- [models.js](https://github.com/DScheglov/jsonschema-builder/blob/master/samples/models.js)

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

## Schema id

Please note that `jsonschema-builder` adds the `id` field to each schema

In the first case (exports as an object) the tool adds the `id` field to the
resulting json schema. To avoid this behavior use `--noid` option.


## API

The tool is just a command line interface for node-module `mongoose-schema-jsonschema`.
So you could to import mentioned above module to your project and use it directly.

```shell
npm install mongoose-schema-jsonschema
```

More details by the link
[mongoose-schema-jsonschema](https://www.npmjs.com/package/mongoose-schema-jsonschema)
