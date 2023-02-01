Run the following command to build the Docker image:
'''
docker build -t hello-world-web-app .
'''

Run the following command to start a container from the image:
'''
docker run -p 3000:3000 hello-world-web-app
'''

You can access the "Hello World" web application in a web browser by navigating to http://localhost:3000. You should see the message "Hello World!" displayed in the browser.