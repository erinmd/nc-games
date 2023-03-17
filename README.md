# NC Games

https://nc-games-project.netlify.app/

## Project Summary

This project was created using React JS, getting information from a backend api previously created. It displays game reviews, with options to filter, sort and order. Infinite scrolling is used to fetch more reviews. There is a default user, but any of the available users can be selected on the user page. 

The game reviews have an up/down vote button which is also stored in the backend relating to the user. This data is used on the user profile to display which categories users like best.

Comments also have an up/down vote. Comments are ordered by most votes.

Users can delete their own comments, and also their own reviews - but only those they have recently created that do not have comments or votes yet.

## Back end api

Hosted at: https://nc-games-project-2obg.onrender.com/api/
Github: https://github.com/erinmd/nc-games-project

## Versions needed

Node >= v19.8


## How to run this project locally

1. Clone the repo
2. Create a new GitHub repo, do not initialise the project with a readme, .gitignore or license.
3. From your cloned local version of this project you'll want to push your code to your new repo using the following commands:

```
git remote set-url origin YOUR_NEW_REPO_URL_HERE
git branch -M main
git push -u origin main
```