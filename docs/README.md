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

## Installation

```bash
npm install parime
```

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

## How It Works

Parime registers itself as a Fable service and wires up Orator with a Restify service server. During initialization it sets up the Bibliograph record store, the binary filesystem storage, and registers all REST endpoints. The server is then ready to accept HTTP and WebSocket connections.

```
Fable (Core)
  └── Parime (Data Lake Server)
        ├── Orator + Restify (HTTP/WebSocket)
        ├── Bibliograph (Record Storage)
        ├── BinaryStorage (Filesystem)
        ├── LakeValidation (Input Validation)
        └── Endpoints
              ├── Record Lake   /1.0/Record/...
              ├── Binary Lake   /1.0/Binary/...
              ├── Combined Lake /1.0/Combined/...
              └── WebSocket     /1.0/WebSocket/Lake
```

## Related Packages

- [bibliograph](https://fable-retold.github.io/bibliograph/) - Raw record filing and change tracking
- [orator](https://fable-retold.github.io/orator/) - API server abstraction for REST and IPC services
- [orator-serviceserver-restify](https://fable-retold.github.io/orator-serviceserver-restify/) - Restify service server implementation
- [fable](https://fable-retold.github.io/fable/) - Service provider framework
- [meadow](https://fable-retold.github.io/meadow/) - Data access layer with automatic REST endpoints
