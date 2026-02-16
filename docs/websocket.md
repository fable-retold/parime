# WebSocket Protocol

Parime provides a WebSocket interface for real-time access to all three lake types. The WebSocket connection uses Restify's built-in upgrade mechanism with the standard WebSocket handshake protocol.

## Connecting

Connect to the WebSocket endpoint at `/1.0/WebSocket/Lake`:

```javascript
const tmpSocket = new WebSocket('ws://localhost:8080/1.0/WebSocket/Lake');

tmpSocket.onopen = () =>
{
	console.log('Connected to Parime WebSocket');
};

tmpSocket.onmessage = (pEvent) =>
{
	let tmpResponse = JSON.parse(pEvent.data);
	console.log('Response:', tmpResponse);
};
```

The server performs the standard WebSocket handshake using the `Sec-WebSocket-Key` header and the magic GUID per RFC 6455.

## Message Format

All messages are JSON text frames with the following structure:

### Request

```json
{
  "action": "read",
  "type": "record",
  "category": "customers",
  "hash": "customer-001",
  "data": {}
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `action` | Yes | Operation to perform: `read`, `write`, `delete`, `exists`, `list` |
| `type` | Yes | Lake type: `record`, `binary`, `combined` |
| `category` | Yes | The category name |
| `hash` | Depends | The record/file key (not required for `list`) |
| `data` | Depends | The data payload (required for `write`) |

### Response

```json
{
  "success": true,
  "action": "read",
  "type": "record",
  "category": "customers",
  "hash": "customer-001",
  "data": { "Name": "Acme Corp" }
}
```

Error responses include an `error` field:

```json
{
  "success": false,
  "action": "read",
  "type": "record",
  "error": "Record not found."
}
```

## Actions

### read

Read a record or binary file.

**Record:**

```json
{ "action": "read", "type": "record", "category": "customers", "hash": "customer-001" }
```

**Binary:** Binary data is returned as a base64-encoded string in the `data` field.

```json
{ "action": "read", "type": "binary", "category": "images", "hash": "logo.png" }
```

### write

Write a record or binary file.

**Record:** Include the JSON object in the `data` field.

```json
{
  "action": "write",
  "type": "record",
  "category": "customers",
  "hash": "customer-001",
  "data": { "Name": "Acme Corp" }
}
```

**Binary:** Include the binary data as a base64-encoded string in the `data` field.

```json
{
  "action": "write",
  "type": "binary",
  "category": "images",
  "hash": "logo.png",
  "data": "iVBORw0KGgoAAAANSUhEUg..."
}
```

### delete

Delete a record or binary file:

```json
{ "action": "delete", "type": "record", "category": "customers", "hash": "customer-001" }
```

### exists

Check if a record or binary file exists:

```json
{ "action": "exists", "type": "record", "category": "customers", "hash": "customer-001" }
```

Response:

```json
{ "success": true, "action": "exists", "type": "record", "exists": true }
```

### list

List all keys in a category:

```json
{ "action": "list", "type": "record", "category": "customers" }
```

Response:

```json
{ "success": true, "action": "list", "type": "record", "keys": ["customer-001", "customer-002"] }
```

## Connection Management

The WebSocket handler supports ping/pong frames for keepalive and properly handles close frames. The server sends a close frame in response to a client close frame before destroying the socket.

## Frame Protocol

Parime implements the WebSocket frame protocol directly using Restify's `claimUpgrade()` mechanism rather than an external WebSocket library. Server frames are sent unmasked per the WebSocket specification (only client-to-server frames are masked).
