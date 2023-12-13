// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use system_sales::tools::database::{get_database_connection, update_products};
use mongodb::{Database, bson::{doc, Document}};
use system_sales::models::sale::Sale;
use system_sales::models::product::Product;
use futures::stream::TryStreamExt;
//use bson::from_bson;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn login(username: &str, password: &str, rol: &str) -> Result<String, String> {
    let client = get_database_connection().await.unwrap_or_else(|e| {
        panic!("Failed to get database connection: {:?}", e);
    });
    let db: Database = client.database("store");
    let collection = db.collection::<Document>("users");

    let filter = doc!{ "username": username, "password": password, "rol": rol };
    let result = collection.find_one(filter, None).await;

    match result {
        Ok(Some(_)) => Ok("Succeed".to_string()),
        Ok(None) => Ok("Not found".to_string()),
        Err(e) => Err(format!("Error verifying credentials: {:?}", e)),
    }
}

#[tauri::command]
async fn get_all_products() -> Result<String, String> {
    let client = get_database_connection().await
        .map_err(|e| e.to_string())?;

    let db: Database = client.database("store");
    let collection = db.collection::<Document>("products");

    let cursor = collection.find(None, None).await
        .map_err(|e| e.to_string())?;

    let documents: Vec<Document> = cursor.try_collect().await
        .map_err(|e| e.to_string())?;

    let json_data = serde_json::to_string(&documents)
        .map_err(|e| e.to_string())?;

    Ok(json_data)
}

#[tauri::command]
async fn register_shopping(json: &str) -> Result<(), String> {
    let client = get_database_connection().await
        .map_err(|e| e.to_string())?;

    let db: Database = client.database("store");
    let collection = db.collection::<Document>("sales");

    let sale: Sale = serde_json::from_str(json)
        .map_err(|err| format!("Failed to deserialize JSON: {}", err))?;
    println!("{:?}", sale);
    let sale_doc = bson::to_document(&sale)
        .map_err(|err| format!("Error converting Sale to BSON: {:?}", err))?;

    collection.insert_one(sale_doc, None)
        .await
        .map_err(|err| format!("Error inserting sale into database: {:?}", err))?;

    update_products(sale.products).await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn register_product(json: &str) -> Result<(), String> {
    let client = get_database_connection().await
        .map_err(|e| e.to_string())?;

    let db: Database = client.database("store");
    let collection = db.collection::<Document>("products");

    let product: Product = serde_json::from_str(json)
        .map_err(|err| format!("Failed to deserialize JSON: {}", err))?;
    println!("{:?}", product);
    let sale_doc = bson::to_document(&product)
        .map_err(|err| format!("Error converting Sale to BSON: {:?}", err))?;

    collection.insert_one(sale_doc, None)
        .await
        .map_err(|err| format!("Error inserting sale into database: {:?}", err))?;

    Ok(())
}

#[tauri::command]
async fn get_all_shopping() -> Result<String, String> {
    let client = get_database_connection().await
        .map_err(|e| e.to_string())?;

    let db: Database = client.database("store");
    let collection = db.collection::<Document>("sales");

    let cursor = collection.find(None, None).await
        .map_err(|e| e.to_string())?;

    let documents: Vec<Document> = cursor.try_collect().await
        .map_err(|e| e.to_string())?;

    let json_data = serde_json::to_string(&documents)
        .map_err(|e| e.to_string())?;

    Ok(json_data)
}

fn main() {
    tokio::runtime::Runtime::new().unwrap().block_on(async {
        match system_sales::tools::database::initialize_database().await {
            Ok(_) => {
                println!("Database initialized successfully");
            }
            Err(err) => {
                eprintln!("Failed to initialize the database: {:?}", err);
                return;
            }
        }

        tauri::Builder::default()
            .invoke_handler(tauri::generate_handler![
                login,
                get_all_products,
                get_all_shopping,
                register_shopping,
                register_product,
            ])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    });
}
