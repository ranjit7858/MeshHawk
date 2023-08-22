# Mesh-Hawk: Lightweight IoT Network Detection Tool

Mesh-Hawk is a versatile, lightweight, and IoT-enabled tool designed for the detection and analysis of mesh networks. It empowers users to remotely scan specific areas, gather network details, and generate graphical maps of network components based on the collected evidence. Through its multi-stage operation, Mesh-Hawk provides invaluable insights into potential mesh networks and their attributes.

## Features

- **Remote Operation:** Mesh-Hawk operates remotely from a server, allowing users to perform scans and analyses from a distance.

- **Multi-Stage Operation:** The tool executes multiple stages to comprehensively scan and analyze target areas, providing a deep understanding of network components.

- **TSP-BTS Area Scanning:** In the initial phase, Mesh-Hawk performs area scans within TSP-BTS-specific zones, gathering essential network details.

- **Graphical Map Creation:** The tool creates graphical maps that visually represent network components based on the collected evidence. This map aids in understanding network layouts.

- **Mesh Network Identification:** Mesh-Hawk identifies potential mesh networks and offers additional information such as MAC addresses, IP addresses, RSSI values (which can predict device distance), mesh protocols, neighbor nodes, hop counts, device vendor details, and more.

- **Database Comparison:** By comparing network footprints with a database, Mesh-Hawk suggests potential applications that could be employed in the scanned area, enhancing the tool's utility.

- **Comprehensive Scan Reports:** Mesh-Hawk generates detailed scan reports that encompass all collected evidence, providing users with a holistic view of the scanned area's network landscape.

# How to Use 

This guide will walk you through the process of setting up and running the frontend and backend components of the application.

## Frontend Setup and Run

1. **Install Dependencies:** Navigate to the `Frontend` folder and install the required dependencies using npm.

    ```bash
    cd Frontend
    npm install
    ```

2. **Run the Development Server:** After the dependencies are installed, start the development server.

    ```bash
    npm run dev
    ```

    This command will build and launch the frontend application. You can access it in your browser at [http://localhost:5173](http://localhost:5173).

## Backend Setup and Run

1. **Install Dependencies:** Navigate to the `Backend` folder and create a virtual environment. Then, install the required Python packages from the `requirements.txt` file.

    ```bash
    cd Backend
    pip install -r requirements.txt
    ```

2. **Run the Backend Server:** With the virtual environment activated, start the backend server using Uvicorn.

    ```bash
    uvicorn main:app --reload
    ```

    The backend server will be accessible at [http://localhost:8000](http://localhost:8000).

## Putting It All Together

1. **Start the Frontend:** Run the frontend development server as explained above.

2. **Start the Backend:** Run the backend server as explained above.

3. **Access the Application:** Open your web browser and navigate to [http://localhost:3000](http://localhost:3000). This will connect to the frontend, which in turn communicates with the backend at [http://localhost:8000](http://localhost:8000).

That's it! You now have both the frontend and backend components of the application up and running. You can interact with the application through your browser.

Remember to follow these steps each time you want to work with the codebase. If you encounter any issues or errors during the setup process, refer to the respective documentation or seek help from the community.

Feel free to modify the instructions according to your specific project's structure and setup requirements.

# Images
>Home Page
![](https://github.com/Yash-Sakre/MeshHawk/blob/main/Screenshot%202023-08-21%20at%2017-58-56%20MeshHawk.png)

>Upload page
![](https://github.com/Yash-Sakre/MeshHawk/blob/main/Screenshot%202023-08-09%20at%2002-41-03%20Vite%20React.png)


>Mesh Network Graph 
![](https://github.com/Yash-Sakre/MeshHawk/blob/main/Screenshot%202023-08-09%20at%2002-42-02%20Vite%20React.png)
![](https://github.com/Yash-Sakre/MeshHawk/blob/main/Screenshot%202023-08-09%20at%2002-42-11%20Vite%20React.png)
