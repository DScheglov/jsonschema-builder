[![Build status](https://travis-ci.org/DScheglov/jsonschema-builder.svg?branch=master)](https://travis-ci.org/DScheglov/jsonschema-builder?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/DScheglov/jsonschema-builder/badge.svg?branch=master)](https://coveralls.io/github/DScheglov/jsonschema-builder?branch=master)

# jsonschema-builder
Command line tool to generate JSON-schemas by the Mongoose model definition

The tool puts to standard output stream the json schema or an array of such
schemas.

It supports two formats for resulting schemas:
 - javascript (produced by `console.dir(...)`)
 - json (produced by `JSON.stringify()`)

## Contents
 * [Installation](#installation)
 * [Usage](#usage)
 * [Samples](#samples)
 * [Prepared samples](#prepared-samples)
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
          pattern: '^[0-9a-fA-F]{24}$' },
       _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
       __v: { type: 'number' } },
    required: [ 'title', 'author' ] },
  { id: '#person',
    title: 'Person',
    type: 'object',
    properties:
     { firstName: { type: 'string' },
       lastName: { type: 'string' },
       dateOfBirth: { type: 'string', format: 'date-time' },
       _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
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


## Prepared samples

`jsonschema-builder` project includes some sample model definitions that
located in the **samples** folder in the project root directory.

The structure is following:

 - .
 - /samples
    - /models
        - [book.js](https://github.com/DScheglov/jsonschema-builder/blob/master/samples/models/book.js)
        - [person.js](https://github.com/DScheglov/jsonschema-builder/blob/master/samples/models/person.js)
    - [list.js](https://github.com/DScheglov/jsonschema-builder/blob/master/samples/list.js)
    - [models.js](https://github.com/DScheglov/jsonschema-builder/blob/master/samples/models.js)

In order to run `jsonschema-builder` with prepared samples you should:
```shell
git clone https://github.com/DScheglov/jsonschema-builder.git
cd jsonschema-builder
npm install
npm link
```

When you finish sample running, just do unlink:
```shell
cd jsonschema-builder
npm unlink
```

Using the `jsonschema-builder` for single model:
```shell
jsonschema-builder samples/models/book
```

Output:
```javascript
{ id: '#book',
  title: 'Book',
  type: 'object',
  properties:
   { title: { type: 'string' },
     year: { type: 'number' },
     author:
      { type: 'string',
        'x-ref': 'Person',
        description: 'Refers to Person',
        pattern: '^[0-9a-fA-F]{24}$' },
     _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
     __v: { type: 'number' } },
  required: [ 'title', 'author' ] }
```

To get schema for all models located in the **samples/models** directory in
JSON format
```shell
jsonschema-builder --dir --json samples/models
```

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

Please consider the difference between result of `jsonschema-builder` call
with in option `--dir` and without that option:

```shell
jsonschema-builder --json samples/models
```

The `jsonschema-builder` will search for module by path `samples/models` and
without `--dir` option will find **samples/models.js** instead of **samples/models/**
folder in case when `--dir` option specified

Output:
```javascript
[
  {
    "id": "#point",
    "title": "Point",
    "type": "object",
    "properties": {
      "x": {
        "type": "number"
      },
      "y": {
        "type": "number"
      },
      "title": {
        "type": "string"
      },
      "_id": {
        "type": "string",
        "format": "uuid",
        "pattern": "^[0-9a-fA-F]{24}$"
      },
      "__v": {
        "type": "number"
      }
    }
  },
  {
    "id": "#line",
    "title": "Line",
    "type": "object",
    "properties": {
      "start": {
        "title": "start",
        "type": "object",
        "properties": {
          "x": {
            "type": "number"
          },
          "y": {
            "type": "number"
          },
          "title": {
            "type": "string"
          },
          "_id": {
            "type": "string",
            "format": "uuid",
            "pattern": "^[0-9a-fA-F]{24}$"
          },
          "__v": {
            "type": "number"
          }
        }
      },
      "end": {
        "title": "end",
        "type": "object",
        "properties": {
          "x": {
            "type": "number"
          },
          "y": {
            "type": "number"
          },
          "title": {
            "type": "string"
          },
          "_id": {
            "type": "string",
            "format": "uuid",
            "pattern": "^[0-9a-fA-F]{24}$"
          },
          "__v": {
            "type": "number"
          }
        }
      },
      "title": {
        "type": "string"
      },
      "_id": {
        "type": "string",
        "format": "uuid",
        "pattern": "^[0-9a-fA-F]{24}$"
      },
      "__v": {
        "type": "number"
      }
    }
  }
]
```

## Schema id

Please note that `jsonschema-builder` adds the `id` field to each schema. To
avoid this behavior use `--noid` option.

You could specify the style of `id` field. Currently supported the following
options:
 - `dash` (*default*) - creates `id` from `model.name` in dash-style (`model-name`)
 - `underline` - entails the dash_style of `id` (`model_name`)
 - `camel` - removes all underlines and dashes form the `model.name` and returns camelStyle `id` (modelName)
 - `lower` - transforms all letters in `model.name` in the lower case analogs (modelname)


## API

You can use `jsonschema-builder` inside of your code:
```javascript
'use strict';

const jsonSchemaBuilder = require('jsonschema-builder');

let schemas = jsonSchemaBuilder('samples', {
  dir: true,
  recursive: true,
  json: true
})
```
The result will be the same as you call `jsonschema-builder` via command-line:
```shell
jsonschema-builder -jrd samples
```

### jsonSchemaBuilder
Builds the json schema based on the Mongooose model definition specified by
the path to appropriate module

Declaration:
```javascript
function jsonSchemaBuilder(pathToModels, options) { ... }
```

Parameters:
 - **pathToModels**: `String` -  the path to model definition(s)
 - **options**: `Object` - the options for schema creation
    - **noid**: `Boolean` - prevents `id`
    - **json**: `Boolean` - entails the JSON-formated result
    - **id**: `String` - defines the `id` field format
    - **dir**: `Boolean` - enforces the function to consider `pathToModels` as a directory
    - **recursive**: `Boolean` - enforces to find all models in `pathToModels` and in all its sub-dirctories
 - *Returns* `Object`|`String` - json schema

Methods:

#### `extendMongoose`
Extends the `mongoose.Model` and `mongoose.Schema` with method `jsonSchema` and
returns `Mongoose` instance

Declaration:
```javascript
function extendMongoose(mongoose) { ... }
```

In case you need to create json schema for `mongoose.Model` or `mongoose.Schema`
instance you should use `mongoose-schema-jsonschema` module that is the core
of `jsonschema-builder`.

You can import core-module directly by its name or call `extendMongoose`
method of `jsonSchemaBuilder` object;

```javascript
'use strict';

const jsonSchemaBuilder = require('jsonschema-builder');
const mongoose = jsonSchemaBuilder.extendMongoose(
  require('mongoose')
);

const Book = require('samples/models/book');

console.dir(Book.jsonSchema(), {depth: null});
```

Output:
```shell
{ title: 'Book',
  type: 'object',
  properties:
   { title: { type: 'string' },
     year: { type: 'number' },
     author:
      { type: 'string',
        'x-ref': 'Person',
        description: 'Refers to Person',
        pattern: '^[0-9a-fA-F]{24}$' },
     _id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
     __v: { type: 'number' } },
  required: [ 'title', 'author' ] }
```

More details by the link
[mongoose-schema-jsonschema](https://www.npmjs.com/package/mongoose-schema-jsonschema)


## Contribution
Please register issues you met in the github-repository:
[https://github.com/DScheglov/jsonschema-builder/issues](https://github.com/DScheglov/jsonschema-builder/issues)

Also I'll be thankful for code review.
