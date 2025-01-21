

https://github.com/roapi/roapi


https://doc.rust-lang.org/cargo/getting-started/installation.html

curl https://sh.rustup.rs -sSf | sh


cargo install --locked --git https://github.com/roapi/roapi --branch main --bins roapi --features database, database-sqlite

roapi -c roapi-config.yaml
