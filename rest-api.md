# REST API ENDPOINTS


**/searchq?=**
---

GET  - displays all the results for a given query

**/users**
---
GET users/ - displays all users currently authenticated.

POST users/{id} - adds a new user

PUT users/{id} - updates an existing user object

DELETE users/{id} - deletes an existing user object


**/history**
---

GET /history/ : returns all history elements

DELETE /history/id : deletes a selected history object
  * Will have to look into how we select the object (click, etc.) and how the ID of that object is returned.

POST history/{id}
  * Will be done automatically once a search term is entered.
  * Will most likely be a list of past search TERMS instead of pages visited.
