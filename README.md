# NC Games

https://nc-games-project.netlify.app/

## Project Summary

This project was created using React JS, getting information from a backend api previously created. It displays game reviews, with options to filter, sort and order. Infinite scrolling is used to fetch more reviews. There is a default user, but any of the available users can be selected on the user page. 

The game reviews have an up/down vote button which is also stored in the backend relating to the user. This data is used on the user profile to display which categories users like best.

Comments also have an up/down vote. Comments are ordered by most votes.

Users can add comments, and post new reviews. Form validation is used, and then a further check is given in the reviews case.

Users can delete their own comments, and also their own reviews - but only those they have recently created that do not have comments or votes yet. The best way to test this is to create your own review, which you will then be able to delete.

Error handling has been considered for invalid paths and inputs. This is clearly communicated to the user.

I have used mobile first design, focussing on ensuring the content is clear for all different displays. I have considered accessibility, and all pages of the website rate 100% when using lighthouse.

## Back end api

Hosted at: https://nc-games-project-2obg.onrender.com/api/
Github: https://github.com/erinmd/nc-games-project

## Versions needed

Node >= v19.8


## How to run this project locally

1. Fork and clone the repo
```
$ git clone <forked-repo-url>
```
2. Navigate to the correct folder
```
$ cd nc-games
```
3. Install dependencies
```
$ npm i 
```
4. Start it up locally
```
$ npm start
```