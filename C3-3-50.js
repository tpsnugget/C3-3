use blog

db.users.insertMany([
   {
      name: "Max Schwarzmueller",
      age: 29,
      email: "max@test.com"
   },
   {
      name: "Manuel Lorenz",
      age: 30,
      email: "manu@test.com"
   }
])

db.posts.insertOne({
   title: "My first post",
   text: "This is my first post, I hope you like it.",
   tags: ["new", "tech"],
   creator: ObjectId("5db3632190feab9416e3bfcb"),
   comments: [
      {
         text: "I like this post",
         commentAuthor: ObjectId("5db3632190feab9416e3bfca")
      }
   ]
})

db.createCollection('posts', {
   validator: {
     $jsonSchema: {
       bsonType: 'object',
       required: ['title', 'text', 'creator', 'comments'],
       properties: {
         title: {
           bsonType: 'string',
           description: 'must be a string and is required'
         },
         text: {
           bsonType: 'string',
           description: 'must be a string and is required'
         },
         creator: {
           bsonType: 'objectId',
           description: 'must be an objectid and is required'
         },
         comments: {
           bsonType: 'array',
           description: 'must be an array and is required',
           items: {
             bsonType: 'object',
             required: ['text', 'author'],
             properties: {
               text: {
                 bsonType: 'string',
                 description: 'must be a string and is required'
               },
               author: {
                 bsonType: 'objectId',
                 description: 'must be an objectid and is required'
               }
             }
           }
         }
       }
     }
   }
 });