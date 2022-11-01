# Install base image
FROM python:3

# Install common tools
RUN apt-get update && apt-get install -y wget curl nano htop git unzip bzip2 software-properties-common supervisor vim

# Pass environmental variable
ENV PYTHONUNBUFFERED=1

# Copy the requirements file
COPY stack/backend/requirements.txt /code/

# Copy the code in the working directory
# COPY backend/urlshortener /code/

WORKDIR /code/

# Install requirements from file
RUN pip install -r requirements.txt

EXPOSE 80

# REMOVE THIS LINE
# CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]
