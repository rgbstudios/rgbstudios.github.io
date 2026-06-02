---
layout: blog_layout
title: 'Parquet Files Explained for Programmers'
slug: 'parquet-files-explained'
date: '2026/06/02'
updated_date: '2026/06/02'
author: 'Justin Golden'
preview_text: 'A beginner-friendly explanation of Parquet files for programmers who already understand CSVs.'
img: '/img/blog/parquet.avif'
categories: ['webdev', 'data']
keywords:
  [
    'parquet files explained',
    'what is a parquet file',
    'parquet vs csv',
    'parquet file example',
    'parquet for programmers',
    'columnar file format',
    'beginner parquet tutorial'
  ]
---

<figure>
  <picture>
    <source type="image/avif" srcset="/img/blog/parquet.avif" alt="" />
    <img src="/img/blog/parquet.jpg" alt="">
  </picture>
  <figcaption>Photo credit @moino007 on Unsplash</figcaption>
</figure>

Imagine you run a massive grocery store. A customer asks, "How much did I spend on dairy items this month?"

Would you rather flip through every receipt line by line, or jump straight to the columns labeled `Category` and `Price`?

That is the core idea behind Apache Parquet.

Parquet is an open-source, column-oriented file format for structured data. It stores rows and columns like a CSV does, but it stores the data by column instead of storing it as plain text rows. That makes it especially useful for analytics, reporting, data pipelines, and tools like Apache Spark, DuckDB, AWS Athena, Snowflake, and Google BigQuery.

## Start with CSV

If you already understand CSVs, you know they are simple text files. Each line is one row, and commas separate the fields.

Here is a small supermarket receipt dataset:

```csv
receipt_id,timestamp,item,category,price
1001,2026-06-01 08:30,Milk,Dairy,4.50
1001,2026-06-01 08:30,Bread,Bakery,3.00
1002,2026-06-01 09:15,Cheddar Cheese,Dairy,5.49
1003,2026-06-01 10:00,Apples,Produce,4.25
1004,2026-06-01 11:20,Greek Yogurt,Dairy,1.29
1005,2026-06-01 12:10,Chicken Breast,Meat,9.75
1006,2026-06-01 13:40,Butter,Dairy,4.99
1007,2026-06-01 14:05,Rice,Pantry,3.99
```

If this file is named `receipts.csv`, opening it in a text editor shows exactly that.

To answer "How much was spent on dairy items?", a program has to scan the rows and find these records:

- `Milk`: `4.50`
- `Cheddar Cheese`: `5.49`
- `Greek Yogurt`: `1.29`
- `Butter`: `4.99`

So the total is:

```txt
4.50 + 5.49 + 1.29 + 4.99 = 16.27
```

For this tiny file, CSV is fine. For millions of receipt rows, scanning full text rows gets expensive.

## Row storage vs column storage

CSV is row-oriented. Conceptually, it stores the data like this:

```txt
1001,2026-06-01 08:30,Milk,Dairy,4.50
1001,2026-06-01 08:30,Bread,Bakery,3.00
1002,2026-06-01 09:15,Cheddar Cheese,Dairy,5.49
...
```

That is good when you want to read or write a complete row. For example, if you need every field on receipt `1001`, row storage is natural.

The downside appears when you only need a couple of columns. If your query only needs `category` and `price`, a CSV reader still has to move through `receipt_id`, `timestamp`, and `item` to parse each line.

Parquet is column-oriented. It groups values from the same column together:

```txt
receipt_id:
  [1001, 1001, 1002, 1003, 1004, 1005, 1006, 1007]

timestamp:
  ["2026-06-01 08:30", "2026-06-01 08:30", "2026-06-01 09:15", ...]

item:
  ["Milk", "Bread", "Cheddar Cheese", "Apples", "Greek Yogurt", ...]

category:
  ["Dairy", "Bakery", "Dairy", "Produce", "Dairy", "Meat", "Dairy", "Pantry"]

price:
  [4.50, 3.00, 5.49, 4.25, 1.29, 9.75, 4.99, 3.99]
```

That is good for analytics. If a query only needs `category` and `price`, a Parquet reader can skip the other columns.

## What does a Parquet file look like?

A real `.parquet` file is binary. You do not hand-write it like a CSV, and if you open it in Notepad or another basic text editor, it will mostly look like unreadable machine data.

But if you inspect `receipts.parquet` with a Parquet-aware tool, the structure would look conceptually like this:

```txt
File: receipts.parquet

Schema:
  receipt_id: int64
  timestamp: timestamp
  item: string
  category: string
  price: double

Column chunks:
  receipt_id:
    [1001, 1001, 1002, 1003, 1004, 1005, 1006, 1007]

  timestamp:
    ["2026-06-01 08:30", "2026-06-01 08:30", "2026-06-01 09:15", ...]

  item:
    ["Milk", "Bread", "Cheddar Cheese", "Apples", "Greek Yogurt", ...]

  category:
    ["Dairy", "Bakery", "Dairy", "Produce", "Dairy", "Meat", "Dairy", "Pantry"]

  price:
    [4.50, 3.00, 5.49, 4.25, 1.29, 9.75, 4.99, 3.99]

Metadata footer:
  columns: receipt_id, timestamp, item, category, price
  types: int64, timestamp, string, string, double
  row count: 8
  column locations: where each column chunk starts and ends in the file
  statistics: optional min, max, null count, and other details by column chunk
```

The exact on-disk format is more complex than this, but this model is useful: Parquet stores the columns together, then stores metadata so query engines know what is inside and where to find it.

## Summing dairy items

With SQL, the dairy query is straightforward:

```sql
SELECT SUM(price) AS dairy_total
FROM 'receipts.parquet'
WHERE category = 'Dairy';
```

Result:

```txt
dairy_total
16.27
```

The important part is how the Parquet reader can answer it:

- It checks the file metadata.
- It sees the query needs only `category` and `price`.
- It skips `receipt_id`, `timestamp`, and `item`.
- It scans the `category` values for `Dairy`.
- It sums the matching `price` values.

With eight rows, this is not a big deal. With 100 million receipt rows and 100 columns, skipping 98 columns can be a huge win.

## Why Parquet compresses well

Parquet often produces smaller files than CSV because each column contains similar values.

Look at the `category` column:

```txt
["Dairy", "Bakery", "Dairy", "Produce", "Dairy", "Meat", "Dairy", "Pantry"]
```

Parquet can use techniques like dictionary encoding. Conceptually, it can build a dictionary:

```txt
0 = Dairy
1 = Bakery
2 = Produce
3 = Meat
4 = Pantry
```

Then it can store the category values more like this:

```txt
[0, 1, 0, 2, 0, 3, 0, 4]
```

That is easier to compress than repeating the same strings over and over. Parquet also benefits because numbers are stored as numbers, timestamps are stored as timestamps, and each column can be compressed in a way that suits that column.

Parquet can be much smaller and faster to query than CSV, but the exact improvement depends on the data, compression settings, file size, and tool reading it.

## Creating and reading a Parquet file in Python

You can create a real Parquet file from the same receipt data with Python. This example uses Pandas and PyArrow:

```python
import pandas as pd

data = {
    "receipt_id": [1001, 1001, 1002, 1003, 1004, 1005, 1006, 1007],
    "timestamp": [
        "2026-06-01 08:30",
        "2026-06-01 08:30",
        "2026-06-01 09:15",
        "2026-06-01 10:00",
        "2026-06-01 11:20",
        "2026-06-01 12:10",
        "2026-06-01 13:40",
        "2026-06-01 14:05"
    ],
    "item": [
        "Milk",
        "Bread",
        "Cheddar Cheese",
        "Apples",
        "Greek Yogurt",
        "Chicken Breast",
        "Butter",
        "Rice"
    ],
    "category": ["Dairy", "Bakery", "Dairy", "Produce", "Dairy", "Meat", "Dairy", "Pantry"],
    "price": [4.50, 3.00, 5.49, 4.25, 1.29, 9.75, 4.99, 3.99]
}

df = pd.DataFrame(data)

df.to_parquet("receipts.parquet", index=False)

receipts = pd.read_parquet("receipts.parquet")
dairy_total = receipts.loc[receipts["category"] == "Dairy", "price"].sum()

print(dairy_total)
```

Output:

```txt
16.27
```

You can query Parquet with Pandas, Polars, DuckDB, Spark, cloud data warehouses, and many other tools.

## CSV vs Parquet

CSV is best when you want a simple text file that humans can read, edit, email, or paste into examples.

Parquet is best when software will process the data repeatedly, especially when the data is large, typed, and queried by column.

| Feature | CSV | Parquet |
| --- | --- | --- |
| File type | Plain text | Binary |
| Human-readable | Yes | Not directly |
| Stores column types | No | Yes |
| Typical layout | Row-oriented | Column-oriented |
| Good for small examples | Yes | Sometimes |
| Good for analytics | Limited | Yes |
| Compression | External or manual | Built in |
| Reads only needed columns | Usually no | Yes |

## When to use Parquet

Use Parquet when:

- Your data has many rows or many columns.
- Your queries usually read only some columns.
- You care about file size.
- You want to preserve column types.
- You are working with analytics tools, data warehouses, or data pipelines.

Use CSV when:

- The file is small.
- Humans need to open or edit it directly.
- Simplicity matters more than query performance.
- You are sharing a quick example or importing data into a tool that expects CSV.

In short: CSV is a simple text table. Parquet is a typed, compressed, column-oriented table built for efficient software queries.
