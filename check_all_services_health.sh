#!/bin/sh

# Define the gRPC services and their addresses
SERVICES="
3.16.155.114:30002 platform_svc_forex.ForexService.IsAlive
3.16.155.114:30001 platform_svc_gibbs.GibbsService.IsAlive
3.16.155.114:30003 platform_svc_plutus.TransactionService.IsAlive
3.16.155.114:30004 platform_svc_davy_jones.DavyJonesService.IsAlive
"

# Function to extract the service name from the method
extract_service_name() {
    local service_method="$1"
    echo "$service_method" | awk -F '.' '{print $2}' | awk -F 'IsAlive' '{print $1}'
}

# Variable to store health check results
RESULTS=""
WARNING=""

# Function to check the health of a service
check_health() {
    local address_service_method="$1"
    IFS=' ' read -r address service_method <<< "$address_service_method"
    service_name=$(extract_service_name "$service_method")
    
    # Perform the gRPC call and capture output
    response=$(grpcurl -plaintext -d '{}' "$address" "$service_method" 2>&1)
    
    # Check if there was a connection error
    if echo "$response" | grep -q "Failed to dial target host"; then
        healthy="unreachable"
    else
        # Extract the health status
        healthy=$(echo "$response" | grep -o '"healthy": *[^,]*' | awk '{print $2}' | tr -d '"')
    fi

    # Append result to RESULTS
    RESULTS="$RESULTS$service_name:$healthy "
    
    # If health status is false or unreachable, set a warning
    if [ "$healthy" = "false" ] || [ "$healthy" = "unreachable" ]; then
        WARNING="Warning: $RESULTS"
    fi
}

# Main loop to check health every 5 minutes
while true; do
    echo "Starting health check..."

    # Clear previous results and warnings
    RESULTS=""
    WARNING=""

    # Check each service
    for service in $SERVICES; do
        check_health "$service"
    done

    # Print results in the format service_name:health_status
    echo "$RESULTS"

    # Print warning if any service is unhealthy or unreachable
    if [ -n "$WARNING" ]; then
        echo "$WARNING"
    fi

    echo "Health check completed. Sleeping for 5 minutes..."
    sleep 300  # Sleep for 5 minutes (300 seconds)
done

