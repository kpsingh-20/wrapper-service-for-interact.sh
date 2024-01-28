# Interactsh Client Server

This Node.js server interacts with the `interactsh-client` to fetch and filter interactions.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- `interactsh-client` installed (`go install -v github.com/projectdiscovery/interactsh/cmd/interactsh-client@latest`)

### Installation

1. Clone this repository:

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the server:

    ```bash
    node app.js
    ```

    The server will be running on http://localhost:3000 by default.

## API Endpoints

### 1. Get Interactsh URL

- **Endpoint**: `/api/getURL`
- **Method**: GET
- **Description**: Retrieves the current interactsh URL used by the `interactsh-client`.
- **Response Example**:

    ```json
    {
      "url": "cmr9e6j1ntfgnq5da8kgkx5ky4ywxksp4.oast.live"
    }
    ```
### 2. Open a terminal and have some interactions with the test-server url by using ping and curl
- **Do DNS interaction**: `ping cmr9e6j1ntfgnq5da8kgkx5ky4ywxksp4.oast.live`
- **Do HTTP interaction**:`curl cmr9e6j1ntfgnq5da8kgkx5ky4ywxksp4.oast.live`
- In this way, we can interact with test-server and we can get all these interactions by hitting Get Interaction API


### 3. Get Interactions

- **Endpoint**: `/api/getInteractions`
- **Method**: POST
- **Description**: Retrieves interactions based on the provided URL, start timestamp, and end timestamp as request body in json format.
- **Request Example**:

    ```json
    {
      "url": "cmr9e6j1ntfgnq5da8kgkx5ky4ywxksp4.oast.live",
      "start": "",
      "end": ""
    }
    ```

- **Response Example**:

    ```json
  [
	{
		"2024-01-28 18:05:58": "[CMr9e6J1NtfGNq5da8KgKX5kY4ywxksP4] Received DNS interaction (A) from 192.178.66.132 at 2024-01-28 18:05:58"
	},
	{
		"2024-01-28 18:05:58": "[CmR9E6j1NtFGnQ5Da8kgKX5kY4YwxKSP4] Received DNS interaction (A) from 172.253.226.97 at 2024-01-28 18:05:58"
	},
	{
		"2024-01-28 18:05:58": "[cmr9e6j1ntfgnq5da8kgkx5ky4ywxksp4] Received DNS interaction (A) from 106.77.174.195 at 2024-01-28 18:05:58"
	},
	{
		"2024-01-28 18:05:58": "[cmr9e6j1ntfgnq5da8kgkx5ky4ywxksp4] Received DNS interaction (A) from 106.77.174.194 at 2024-01-28 18:05:58"
	},
]
    
  
       

