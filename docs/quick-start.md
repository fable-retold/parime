# Quick Start

This guide walks through setting up a Parime data lake server and interacting with all three lake types.

## Server Setup

Create a new project and install the dependencies:

```bash
npm init -y
npm install parime
```

Create a server file:

```javascript
const libFable = require('fable');
const libParime = require('parime');

const _Fable = new libFable(
	{
		Product: 'MyDataLake',
		ProductVersion: '1.0.0',
		APIServerPort: 8080,
		ParimeBinaryStorageRoot: './data/'
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

Start the server:

```bash
node server.js
```

## Working with Record Lakes

Store a JSON record in the `customers` category:

```bash
curl -X PUT http://localhost:8080/1.0/Record/customers/customer-001 \
  -H "Content-Type: application/json" \
  -d '{"Name": "Acme Corp", "Industry": "Manufacturing"}'
```

Read it back:

```bash
curl http://localhost:8080/1.0/Record/customers/customer-001
```

List all records in the category:

```bash
curl http://localhost:8080/1.0/Record/customers
```

Check if a record exists:

```bash
curl http://localhost:8080/1.0/Record/customers/Exists/customer-001
```

Delete a record:

```bash
curl -X DELETE http://localhost:8080/1.0/Record/customers/customer-001
```

## Working with Binary Lakes

Store a binary file:

```bash
curl -X PUT http://localhost:8080/1.0/Binary/images/logo.png \
  --data-binary @logo.png
```

Read it back:

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png -o logo-downloaded.png
```

Read only the first 1024 bytes (byte-range request):

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png \
  -H "Range: bytes=0-1023"
```

Get file statistics:

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png/Stat
```

Binary paths support forward slashes for nested organization:

```bash
curl -X PUT http://localhost:8080/1.0/Binary/images/2024/photos/vacation.jpg \
  --data-binary @vacation.jpg
```

## Working with Combined Lakes

Combined lakes let you store a JSON record and a binary file under the same key. Write the record portion:

```bash
curl -X PUT http://localhost:8080/1.0/Combined/documents/doc-001/Record \
  -H "Content-Type: application/json" \
  -d '{"Title": "Annual Report", "Author": "Finance Team"}'
```

Write the file portion:

```bash
curl -X PUT http://localhost:8080/1.0/Combined/documents/doc-001/File \
  --data-binary @report.pdf
```

Read the record:

```bash
curl http://localhost:8080/1.0/Combined/documents/doc-001/Record
```

Read the file:

```bash
curl http://localhost:8080/1.0/Combined/documents/doc-001/File -o report.pdf
```

List all keys with presence flags:

```bash
curl http://localhost:8080/1.0/Combined/documents
```

The response includes `HasRecord` and `HasFile` flags for each key:

```json
{
  "Category": "documents",
  "Keys": [
    { "Key": "doc-001", "HasRecord": true, "HasFile": true }
  ]
}
```

Delete both the record and file:

```bash
curl -X DELETE http://localhost:8080/1.0/Combined/documents/doc-001
```
