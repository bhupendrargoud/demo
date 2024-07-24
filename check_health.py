import os
import pymysql
import requests
import json
import time
from datetime import datetime

# MySQL credentials and other configurations
HOST= 'binance-sg.c1cuigqameya.ap-southeast-1.rds.amazonaws.com'
USER= 'admin'
PASSWORD= 'rerwaP-myfbu7-pergad'
HEALTH_CHECK_URL= 'https://api-sg.thereward.store/health'
SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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'

def check_health():
    # Get the current timestamp
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Execute the MySQL query to get max_connections and Threads_connected
    try:
        connection = pymysql.connect(
            host=HOST,
            user=USER,
            password=PASSWORD,
            cursorclass=pymysql.cursors.DictCursor
        )

        with connection.cursor() as cursor:
            cursor.execute("SHOW VARIABLES LIKE 'max_connections'")
            max_connections = cursor.fetchone()['Value']
            
            cursor.execute("SHOW STATUS LIKE 'Threads_connected'")
            threads_connected = cursor.fetchone()['Value']

        max_connections = int(max_connections)
        threads_connected = int(threads_connected)
    except pymysql.MySQLError as e:
        max_connections = 0
        threads_connected = 0

    # Fetch and parse the health check data
    try:
        response = requests.get(HEALTH_CHECK_URL)
        health_result = response.json()
        health_status = "healthy" if health_result.get("healthy", False) else "unhealthy"
    except requests.RequestException as e:
        health_status = "unhealthy"

    # Calculate the percentage
    if max_connections > 0:
        percentage = (threads_connected / max_connections) * 100
    else:
        percentage = 0

    # Check if the percentage exceeds 60% or health status is unhealthy
    if percentage > 60 or health_status == "unhealthy":
        msg = f"{timestamp} - Warning: Current connection usage: {percentage:.2f}% - {threads_connected}. Health status: {health_status}"
        payload = {"text": msg}
        try:
            requests.post(SLACK_WEBHOOK_URL, data=json.dumps(payload), headers={"Content-Type": "application/json"})
        except requests.RequestException as e:
            pass
    else:
        msg = f"={timestamp} - Working normally. Current connection usage: {percentage:.2f}% - {threads_connected}. Health status: {health_status}"

    # Print the final message
    print(msg)

# Main loop to repeat the health check every 5 minutes
while True:
    check_health()
    time.sleep(300)  # Sleep for 5 minutes (300 seconds)
