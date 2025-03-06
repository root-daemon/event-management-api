#!/bin/bash

# Define colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to display help
show_help() {
  echo -e "${YELLOW}Event Management API Docker Helper${NC}"
  echo ""
  echo "Usage: ./docker.sh [command]"
  echo ""
  echo "Commands:"
  echo "  up        - Start the containers in detached mode"
  echo "  upf       - Start the containers in foreground"
  echo "  down      - Stop and remove the containers"
  echo "  rebuild   - Rebuild and restart the containers"
  echo "  logs      - Show logs for all containers"
  echo "  logs-app  - Show logs for the app container only"
  echo "  logs-db   - Show logs for the database container only"
  echo "  ps        - Show running containers"
  echo "  help      - Show this help message"
}

# Function to start containers
start_containers() {
  echo -e "${GREEN}Starting containers...${NC}"
  docker-compose up -d
  echo -e "${GREEN}Containers started successfully!${NC}"
  echo -e "${YELLOW}API is accessible at: http://localhost:3000/api${NC}"
}

# Function to start containers in foreground
start_containers_foreground() {
  echo -e "${GREEN}Starting containers in foreground...${NC}"
  docker-compose up
}

# Function to stop and remove containers
stop_containers() {
  echo -e "${GREEN}Stopping and removing containers...${NC}"
  docker-compose down
  echo -e "${GREEN}Containers stopped and removed successfully!${NC}"
}

# Function to rebuild and restart containers
rebuild_containers() {
  echo -e "${GREEN}Rebuilding and restarting containers...${NC}"
  docker-compose down
  docker-compose build --no-cache
  docker-compose up -d
  echo -e "${GREEN}Containers rebuilt and restarted successfully!${NC}"
  echo -e "${YELLOW}API is accessible at: http://localhost:3000/api${NC}"
}

# Main script logic
case "$1" in
  up)
    start_containers
    ;;
  upf)
    start_containers_foreground
    ;;
  down)
    stop_containers
    ;;
  rebuild)
    rebuild_containers
    ;;
  logs)
    docker-compose logs -f
    ;;
  logs-app)
    docker-compose logs -f app
    ;;
  logs-db)
    docker-compose logs -f db
    ;;
  ps)
    docker-compose ps
    ;;
  help|*)
    show_help
    ;;
esac 