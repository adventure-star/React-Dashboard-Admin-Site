Hatake Administrator

================================

### Technical Stack

	- Node: version 12.19.0

	- React: version 16.12.0

    - Redux: version 7.2.0

	- UI Framework: Carolina React Admin Dashboard with Material-UI PRO
      https://themes.material-ui.com/themes/carolina-react-admin-dashboard-pro

### Install packages

	```
	$ yarn install
	```

### Create .env file and add a variable in the file
    ```
    NODE_PATH = src/
    ```

### Run server
	```
	$ yarn start
	```

### Build production server
    ```
    $ yarn run build
    ```

### Server urls

    - http://localhost:3000/admin/

### Deployment

    1. Build with production mode.

        ```
        $ yarn run build
        ```

    2. Upload all files in `build` directory to admin server.

        You can deploy this app on AWS S3, or other global server with Nginx.
