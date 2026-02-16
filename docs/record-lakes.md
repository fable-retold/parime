# Record Lakes

Record lakes provide scoped JSON record storage backed by Bibliograph. Each record is identified by a category and a hash (key), and Bibliograph handles persistence with built-in change tracking.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/1.0/Record/:category` | List all record keys in a category |
| GET | `/1.0/Record/:category/:hash` | Read a single record |
| GET | `/1.0/Record/:category/:hash/Metadata` | Read record metadata |
| GET | `/1.0/Record/:category/:hash/Delta` | Read record delta history |
| PUT | `/1.0/Record/:category/:hash` | Create or update a record |
| DELETE | `/1.0/Record/:category/:hash` | Delete a record |
| GET | `/1.0/Record/:category/Exists/:hash` | Check if a record exists |

## Categories

Categories act as namespaces for records. On first access to a new category, Parime automatically creates the corresponding Bibliograph source. Category names must start with an alphabetic character and contain only alphanumeric characters, hyphens and underscores.

## Writing Records

Send a PUT request with a JSON body:

```bash
curl -X PUT http://localhost:8080/1.0/Record/customers/customer-001 \
  -H "Content-Type: application/json" \
  -d '{"Name": "Acme Corp", "Industry": "Manufacturing"}'
```

Response:

```json
{
  "Category": "customers",
  "Hash": "customer-001",
  "Written": true
}
```

## Reading Records

```bash
curl http://localhost:8080/1.0/Record/customers/customer-001
```

Returns the stored JSON object directly. If the record does not exist, returns a 404.

## Listing Records

```bash
curl http://localhost:8080/1.0/Record/customers
```

Response:

```json
{
  "Category": "customers",
  "Keys": ["customer-001", "customer-002"]
}
```

## Metadata

Each record has associated metadata managed by Bibliograph:

```bash
curl http://localhost:8080/1.0/Record/customers/customer-001/Metadata
```

## Delta History

Bibliograph tracks changes to records. Retrieve the delta history with:

```bash
curl http://localhost:8080/1.0/Record/customers/customer-001/Delta
```

## Checking Existence

```bash
curl http://localhost:8080/1.0/Record/customers/Exists/customer-001
```

Response:

```json
{
  "Category": "customers",
  "Hash": "customer-001",
  "Exists": true
}
```

## Deleting Records

```bash
curl -X DELETE http://localhost:8080/1.0/Record/customers/customer-001
```

Response:

```json
{
  "Category": "customers",
  "Hash": "customer-001",
  "Deleted": true
}
```

## Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Invalid category name or hash |
| 404 | Record not found |
| 500 | Internal storage error |
