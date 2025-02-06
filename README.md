# Tech Assessment Challenge

After downloading the repository, make sure you have Docker Desktop installed and running.

In the main project directory, use the command:

```sh
docker-compose up
```

Docker should build the project and install the container for use. After the application is complete, you should be able to access the site on your localhost on port `3000` like so:

[http://localhost:3000/](http://localhost:3000/)

The project runs a React instance with ViteJS as the bundler. I have found vitejs to be very reliable and predictibable for ReactJS which is why I have used it here. Below are the assets in this project.

```json
{
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0",
    "@mui/icons-material": "^6.4.3",
    "@mui/material": "^6.4.3",
    "@mui/x-data-grid": "^7.25.0",
    "@vitejs/plugin-react": "^1.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.5",
    "react-toastify": "^11.0.3",
    "sass": "^1.32.0",
    "tailwindcss": "^2.2.19",
    "typescript": "^4.0.0",
    "vite": "^6.1.0",
    "vite-tsconfig-paths": "^3.0.0"
  }

```
As you can see in the list of dependencies, I have installed sass, tailwind, and MUI for the interface. I like using that combination because each has great features and UX that works well together, in my opinion.

It is also note-worthy that I have used images from [Pexels](https://www.pexels.com/) for the photography. I use it because it's nice quality, it jazzes up an otherwise-boring layout and it's royalty free!

> **Note:** The webpage takes a few extra seconds to load on first-run due to the cold-start.
