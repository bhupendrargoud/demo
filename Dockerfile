# Use an ARM-compatible base image
FROM ubuntu:20.04

# Set environment variables to non-interactive for automated installs
ENV DEBIAN_FRONTEND=noninteractive

# Install MySQL client and curl
RUN apt-get update && \
    apt-get install -y mysql-client curl && \
    apt-get clean

# Set the working directory to /app
WORKDIR /app

# Copy all files from the local directory to /app in the container
COPY . /app

# Ensure all shell scripts have Unix line endings
RUN find /app -type f -name "*.sh" -exec dos2unix {} +



# Make sure the test-run.sh script is executable
RUN chmod +x /app/test-sql.sh
RUN chmod +x /app/test-run.sh

# Set the entrypoint to the test-run.sh script
ENTRYPOINT ["./test-run.sh"]
