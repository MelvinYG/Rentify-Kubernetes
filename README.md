## Rentify

Rentify is a MERN stack travel webisite using React, SASS, Node, Express and MongoDB.

### Specifications

- Used React, React-router, SaSS for front-end development, and Node.js, Express.js, MongoDB, and Mongoose for back-end architecture.
- Implemented secure authentication and authorization mechanisms using bcrypt and JWT, ensuring user data protection and secure access.
- Integrated advanced features like text editing with React-quill, and interactive maps using OpenStreetMaps SDK.
- Facilitated seamless email messages with Nodemailer, and optimized API interactions with Axios.

### Steps to clone 

``` git clone <repo-git-link> ```

### Docker commands

For changes in the docker file use the following command to rebuilt the image

``` docker build -t rentify-app . ```
This will rebuilt the image

To run the container
``` docker run -p 3001:8080 rentify-app ```
Here port "8080" is the port where the node js app listens.

### Kuberenetes setup

Create the pods that run your application. Run the following command to apply your deployment.yaml file:
``` kubectl apply -f deployment.yaml ```

Expose your application to the outside world using a Kubernetes Service. Apply your service.yaml file with the following command:
``` kubectl apply -f service.yaml ```

To check if your deployment is successful and your pods are running:
```kubectl get deployments```

This command will show the status of your deployment, including how many replicas are running.
```kubectl get pods```

This command will list all the pods, their statuses, and the node they are running on. All pods should be in a "Running" state.

To see if your service is correctly exposing your application:
``` kubectl get services ```
This command will list all services, including the one you created, and show the external IP or the node port where your application is accessible.

If you are using Minikube, you can access the service by running:

```minikube service rentify-app```
