import sqlite3

conn = sqlite3.connect("MedQube.db")
cur = conn.cursor()

# Check and add attempts to verification_tokens
cols = [c[1] for c in cur.execute("PRAGMA table_info(verification_tokens)").fetchall()]
if "attempts" not in cols:
    cur.execute("ALTER TABLE verification_tokens ADD COLUMN attempts INTEGER NOT NULL DEFAULT 0")
    print("Added attempts column to verification_tokens")

if "last_sent_at" not in cols:
    cur.execute("ALTER TABLE verification_tokens ADD COLUMN last_sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP")
    print("Added last_sent_at column to verification_tokens")

conn.commit()
conn.close()
print("Database schema successfully synced!")


