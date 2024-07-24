#!/bin/bash

# MySQL credentials
HOST=binance-sg.c1cuigqameya.ap-southeast-1.rds.amazonaws.com
USER=admin
PASSWORD=rerwaP-myfbu7-pergad
HEALTH_CHECK_URL=https://api-sg.thereward.store/health

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/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

# Execute the MySQL query to get max_connections and Threads_connected
RESULT=$(mysql -h $HOST -u $USER -p$PASSWORD  -se "
  SHOW VARIABLES LIKE 'max_connections';
  SHOW STATUS LIKE 'Threads_connected';
")

# Parse the result to get the values
MAX_CONNECTIONS=$(echo "$RESULT" | grep max_connections | awk '{print $2}')
THREADS_CONNECTED=$(echo "$RESULT" | grep Threads_connected | awk '{print $2}')

# Fetch and parse the health check data
HEALTH_RESULT=$(curl -s $HEALTH_CHECK_URL)


# Calculate the percentage
PERCENTAGE=$(echo "scale=2; $THREADS_CONNECTED / $MAX_CONNECTIONS * 100" | bc)


# Parse the health status from the JSON response
HEALTHY=$(echo "$HEALTH_RESULT" | grep -o '"healthy":true')

# Determine the health status
if [ -n "$HEALTHY" ]; then
  HEALTH_STATUS="healthy"
else
  HEALTH_STATUS="unhealthy"
fi


# Check if the percentage exceeds 60% or health status is unhealthy
if (( $(echo "$PERCENTAGE > 60" | bc -l) )) || [ "$HEALTH_STATUS" = "unhealthy" ]; then
  MSG="Warning: Current connection usage: $PERCENTAGE% - $THREADS_CONNECTED. Health status: $HEALTH_STATUS"
  curl -X POST -H "Content-Type: application/json" -d "{\"text\":\"$MSG\"}" "$SLACK_WEBHOOK_URL"
else
  MSG="Working normally. Current connection usage: $PERCENTAGE% - $THREADS_CONNECTED. Health status: $HEALTH_STATUS"
fi


# Print the final message
echo $MSG

