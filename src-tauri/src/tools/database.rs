use mongodb::{Client, options::{ClientOptions, ResolverConfig}};
use mongodb::{Database, bson::{doc, Document}};
use crate::models::shopping::Shopping;
use std::error::Error;

use tokio::sync::Mutex;
use lazy_static::lazy_static;

lazy_static! {
    static ref DB_POOL: Mutex<Option<Client>> = Mutex::new(None);
}

pub async fn initialize_database() -> Result<(), Box<dyn Error>> {
    let client_uri = "mongodb+srv://josecondorip:KOHgwDgSjtr5h3p0@cluster-0.cwsggab.mongodb.net/?retryWrites=true&w=majority";
    let options = ClientOptions::parse_with_resolver_config(client_uri, ResolverConfig::cloudflare()).await?;
    let client = Client::with_options(options)?;

    let mut pool = DB_POOL.lock().await;
    *pool = Some(client);

    Ok(())
}

pub async fn get_database_connection() -> Result<Client, Box<dyn Error>> {
    let pool = DB_POOL.lock().await;

    if let Some(ref client) = *pool {
        Ok(client.clone())
    } else {
        Err("Database not initialized".into())
    }
}
pub async fn update_products(products: Vec<Shopping>) -> Result<(), String> {
    let client = get_database_connection().await
        .map_err(|e| e.to_string())?;

    let db: Database = client.database("store");
    let collection = db.collection::<Document>("products");

    for product in products {
        let filter = doc! { "name": &product.name };
        let update = doc! {
            "$set": { "available": product.current_stock },
        };

        collection
            .update_one(filter, update, None).await
                .map_err(|err| format!("Error updating product {}: {}", product.name, err))?;
    }

    Ok(())
}