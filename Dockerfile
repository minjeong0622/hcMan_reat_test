name: React CI/CD Pipeline with Zero Downtime

on:
  push:
    branches: [ "main", "steve" ]

jobs:
  build:
    name: Build and Deploy React App
    runs-on: ubuntu-latest

    steps:
      # 1. Checkout the code
      - name: Checkout Code
        uses: actions/checkout@v3

      # 2. Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      # 3. Install Dependencies and Build
      - name: Install Dependencies and Build
        run: |
          npm install
          npm run build

      # 4. Docker Login
      - name: Log in to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # 5. Build and Push Docker Image
      - name: Build and Push Docker Image
        run: |
          docker build -t ${{ secrets.DOCKER_USERNAME }}/react-app:latest .
          docker push ${{ secrets.DOCKER_USERNAME }}/react-app:latest
