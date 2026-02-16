# Parime

> Simple generic data lake behaviors for record, binary and combined storage

Parime is a data lake service that provides scoped, category-based storage for JSON records and binary files through a unified REST API. It sits on top of Orator and the Fable ecosystem, giving you record lakes backed by Bibliograph, binary lakes on the local filesystem with HTTP byte-range support, and combined lakes that pair a JSON record with a binary file under the same key. A WebSocket interface provides real-time access to all three lake types.

## Features

- **Record Lakes** - Scoped JSON record storage with full CRUD, metadata and delta history via Bibliograph
- **Binary Lakes** - Filesystem-backed binary storage with nested directory paths and HTTP byte-range serving (RFC 7233)
- **Combined Lakes** - Pair a JSON record with a binary file under the same key, with `/Record` and `/File` sub-endpoints
- **WebSocket Protocol** - Real-time read, write, delete, list and existence checks over a single WebSocket connection
- **Input Validation** - Category name and hash validation with path traversal prevention for binary storage
- **Fable Integration** - First-class service provider in the Fable ecosystem with logging and configuration

## Quick Start

```javascript
const libFable = require('fable');
const libParime = require('parime');

const _Fable = new libFable(
	{
		Product: 'MyDataLake',
		ProductVersion: '1.0.0',
		APIServerPort: 8080,
		ParimeBinaryStorageRoot: './my-binary-storage/'
	});

_Fable.addServiceType('ParimeServer', libParime);
let tmpServer = _Fable.instantiateServiceProvider('ParimeServer');

tmpServer.initialize(
	(pError) =>
	{
		if (pError)
		{
			return console.error('Error starting Parime:', pError);
		}
		console.log('Parime data lake is running on port 8080');
	});
```

Once running, store a JSON record:

```bash
curl -X PUT http://localhost:8080/1.0/Record/customers/customer-001 \
  -H "Content-Type: application/json" \
  -d '{"Name": "Acme Corp", "Industry": "Manufacturing"}'
```

Store a binary file:

```bash
curl -X PUT http://localhost:8080/1.0/Binary/images/logo.png \
  --data-binary @logo.png
```

Read it back with a byte-range request:

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png \
  -H "Range: bytes=0-1023"
```

## Installation

```bash
npm install parime
```

## Configuration

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `Product` | string | `"Parime"` | Application name identifier |
| `ProductVersion` | string | `"1.0.0"` | Application version string |
| `APIServerPort` | number | `9999` | Port for the HTTP server |
| `ParimeBinaryStorageRoot` | string | `"./parime-binary-storage/"` | Root directory for binary file storage |
| `RestifyConfiguration` | object | `{ strictNext: true, handleUpgrades: true }` | Restify server configuration |

## REST API

### Record Lake

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/1.0/Record/:category` | List all record keys in a category |
| GET | `/1.0/Record/:category/:hash` | Read a single record |
| GET | `/1.0/Record/:category/:hash/Metadata` | Read record metadata |
| GET | `/1.0/Record/:category/:hash/Delta` | Read record delta history |
| PUT | `/1.0/Record/:category/:hash` | Create or update a record (JSON body) |
| DELETE | `/1.0/Record/:category/:hash` | Delete a record |
| GET | `/1.0/Record/:category/Exists/:hash` | Check if a record exists |

### Binary Lake

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/1.0/Binary/:category` | List all binary keys in a category |
| GET | `/1.0/Binary/:category/:hash` | Read a binary file (supports byte-range) |
| GET | `/1.0/Binary/:category/:hash/Stat` | Get file statistics (size, timestamps) |
| PUT | `/1.0/Binary/:category/:hash` | Write binary data (raw body) |
| DELETE | `/1.0/Binary/:category/:hash` | Delete a binary file |

Binary paths support forward slashes for nested directory organization. For example, `PUT /1.0/Binary/images/2024/photos/vacation.jpg` stores the file at the nested path `2024/photos/vacation.jpg` under the `images` category.

### Combined Lake

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/1.0/Combined/:category` | List all keys with record/file presence flags |
| GET | `/1.0/Combined/:category/:hash/Record` | Read the record portion |
| PUT | `/1.0/Combined/:category/:hash/Record` | Write the record portion (JSON body) |
| GET | `/1.0/Combined/:category/:hash/File` | Read the file portion (supports byte-range) |
| PUT | `/1.0/Combined/:category/:hash/File` | Write the file portion (raw body) |
| DELETE | `/1.0/Combined/:category/:hash` | Delete both record and file |
| GET | `/1.0/Combined/:category/:hash/Exists` | Check existence of record and file |

### WebSocket

Connect to `/1.0/WebSocket/Lake` with a standard WebSocket upgrade request. Send JSON messages:

```json
{
  "action": "read",
  "type": "record",
  "category": "customers",
  "hash": "customer-001"
}
```

Supported actions: `read`, `write`, `delete`, `exists`, `list`. Supported types: `record`, `binary`, `combined`.

## Documentation

Full documentation is available in the [`docs`](./docs) folder, or served locally:

```bash
npx docsify-cli serve docs
```

- [Architecture](docs/architecture.md) - Lake types, services and storage design
- [Record Lakes](docs/record-lakes.md) - JSON record storage with Bibliograph
- [Binary Lakes](docs/binary-lakes.md) - Binary file storage with byte-range support
- [Combined Lakes](docs/combined-lakes.md) - Paired record and file storage
- [WebSocket Protocol](docs/websocket.md) - Real-time WebSocket message protocol
- [Configuration](docs/configuration.md) - Server and storage configuration

## Testing

```bash
npm test
```

## Related Packages

- [bibliograph](https://github.com/stevenvelozo/bibliograph) - Raw record filing and change tracking
- [orator](https://github.com/stevenvelozo/orator) - API server abstraction for REST and IPC services
- [orator-serviceserver-restify](https://github.com/stevenvelozo/orator-serviceserver-restify) - Restify service server implementation
- [fable](https://github.com/stevenvelozo/fable) - Service provider framework
- [meadow](https://github.com/stevenvelozo/meadow) - Data access layer with automatic REST endpoints
