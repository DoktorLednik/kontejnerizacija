# Use the official MongoDB image from the Docker Hub
FROM mongo:latest

# Probably use passwords in production I don't know I'm not your mother
#ENV MONGO_INITDB_ROOT_USERNAME=admin
#ENV MONGO_INITDB_ROOT_PASSWORD=thisissupersecure

# Expose MongoDB port
EXPOSE 27017

# Start MongoDB
CMD ["mongod"]