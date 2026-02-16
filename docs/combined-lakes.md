# Combined Lakes

Combined lakes pair a JSON record with a binary file under the same category and hash. This is useful when you need to associate metadata with binary content -- for example, storing a document's title and author alongside the document file itself.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/1.0/Combined/:category` | List all keys with presence flags |
| GET | `/1.0/Combined/:category/:hash/Record` | Read the record portion |
| PUT | `/1.0/Combined/:category/:hash/Record` | Write the record portion |
| GET | `/1.0/Combined/:category/:hash/File` | Read the file portion |
| PUT | `/1.0/Combined/:category/:hash/File` | Write the file portion |
| DELETE | `/1.0/Combined/:category/:hash` | Delete both record and file |
| GET | `/1.0/Combined/:category/:hash/Exists` | Check existence of both |

## Sub-Endpoints

Combined lakes use `/Record` and `/File` sub-endpoints rather than a single endpoint that handles both types. This keeps the API consistent with the standalone record and binary lake patterns.

### Writing the Record Portion

```bash
curl -X PUT http://localhost:8080/1.0/Combined/documents/doc-001/Record \
  -H "Content-Type: application/json" \
  -d '{"Title": "Annual Report", "Author": "Finance Team"}'
```

### Writing the File Portion

```bash
curl -X PUT http://localhost:8080/1.0/Combined/documents/doc-001/File \
  --data-binary @report.pdf
```

### Reading the Record Portion

```bash
curl http://localhost:8080/1.0/Combined/documents/doc-001/Record
```

### Reading the File Portion

The file sub-endpoint supports byte-range requests, just like the standalone binary lake:

```bash
curl http://localhost:8080/1.0/Combined/documents/doc-001/File -o report.pdf
```

```bash
curl http://localhost:8080/1.0/Combined/documents/doc-001/File \
  -H "Range: bytes=0-1023"
```

## Listing Keys

Listing returns the union of all record and binary keys with flags indicating which components are present:

```bash
curl http://localhost:8080/1.0/Combined/documents
```

```json
{
  "Category": "documents",
  "Keys": [
    { "Key": "doc-001", "HasRecord": true, "HasFile": true },
    { "Key": "doc-002", "HasRecord": true, "HasFile": false },
    { "Key": "doc-003", "HasRecord": false, "HasFile": true }
  ]
}
```

This allows you to find entries that have only a record, only a file, or both.

## Checking Existence

```bash
curl http://localhost:8080/1.0/Combined/documents/doc-001/Exists
```

```json
{
  "Category": "documents",
  "Hash": "doc-001",
  "RecordExists": true,
  "FileExists": true
}
```

## Deleting Combined Entries

Deleting a combined entry removes both the record and the file in parallel:

```bash
curl -X DELETE http://localhost:8080/1.0/Combined/documents/doc-001
```

```json
{
  "Category": "documents",
  "Hash": "doc-001",
  "RecordDeleted": true,
  "FileDeleted": true
}
```

If only one component existed, the corresponding flag reflects what was actually deleted.

## Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Invalid category name or hash |
| 404 | Record or file not found |
| 416 | Range not satisfiable (file sub-endpoint) |
| 500 | Internal storage error |
