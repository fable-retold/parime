# Binary Lakes

Binary lakes store raw binary data on the local filesystem, organized by categories and hashes. They support HTTP byte-range requests for partial content retrieval and nested directory paths through forward slashes in the hash.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/1.0/Binary/:category` | List all binary keys in a category |
| GET | `/1.0/Binary/:category/:hash` | Read a binary file |
| GET | `/1.0/Binary/:category/:hash/Stat` | Get file statistics |
| PUT | `/1.0/Binary/:category/:hash` | Write binary data |
| DELETE | `/1.0/Binary/:category/:hash` | Delete a binary file |

## Writing Binary Data

Send a PUT request with the raw binary data as the request body:

```bash
curl -X PUT http://localhost:8080/1.0/Binary/images/logo.png \
  --data-binary @logo.png
```

Response:

```json
{
  "Category": "images",
  "Hash": "logo.png",
  "Size": 24576,
  "Written": true
}
```

## Reading Binary Data

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png -o logo.png
```

The response has `Content-Type: application/octet-stream` and the `Accept-Ranges: bytes` header to advertise byte-range support.

## Byte-Range Requests

Binary reads support the HTTP Range header per RFC 7233. This is useful for resumable downloads, media streaming and partial content retrieval.

### Specific Range

Request bytes 0 through 1023:

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png \
  -H "Range: bytes=0-1023"
```

Returns status 206 with headers:

```
Content-Range: bytes 0-1023/24576
Content-Length: 1024
```

### Open-Ended Range

Request from byte 1024 to the end of the file:

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png \
  -H "Range: bytes=1024-"
```

### Suffix Range

Request the last 500 bytes:

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png \
  -H "Range: bytes=-500"
```

### Invalid Range

If the requested range is not satisfiable, the server returns status 416 with a `Content-Range: bytes */TOTAL` header.

## Nested Directory Paths

Forward slashes in the hash create nested subdirectories in the filesystem. This allows organizing binary files in a hierarchy:

```bash
curl -X PUT http://localhost:8080/1.0/Binary/images/2024/photos/vacation.jpg \
  --data-binary @vacation.jpg
```

This stores the file at `{storage-root}/images/2024/photos/vacation.jpg`. When listing keys, the full path is reconstructed:

```bash
curl http://localhost:8080/1.0/Binary/images
```

```json
{
  "Category": "images",
  "Keys": ["logo.png", "2024/photos/vacation.jpg"]
}
```

### Path Traversal Prevention

The validation service rejects path segments containing `..`, `.`, absolute paths and backslashes. Attempts to traverse outside the storage root result in a 400 error.

## File Statistics

Get the size and timestamps for a binary file:

```bash
curl http://localhost:8080/1.0/Binary/images/logo.png/Stat
```

Response:

```json
{
  "Category": "images",
  "Hash": "logo.png",
  "Size": 24576,
  "Modified": "2025-01-15T10:30:00.000Z",
  "Created": "2025-01-15T10:30:00.000Z"
}
```

## Listing Keys

```bash
curl http://localhost:8080/1.0/Binary/images
```

Returns all keys in the category, including nested paths:

```json
{
  "Category": "images",
  "Keys": ["logo.png", "2024/photos/vacation.jpg"]
}
```

## Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Invalid category name or binary path |
| 404 | Binary file not found |
| 416 | Range not satisfiable |
| 500 | Internal storage error |
