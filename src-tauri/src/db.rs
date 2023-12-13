use mongodb::{options::ClientOptions, Client};
use tokio::runtime::Runtime;

fn get_database(){
    let rt = Runtime::new().unwrap();

    let uri = "mongodb+srv://josecondorip:KOHgwDgSjtr5h3p0@cluster-0.cwsggab.mongodb.net/?retryWrites=true&w=majority";
    let client_options = ClientOptions::parse(&uri).unwrap();
    let client = Client::with_options(client_options);

    let db = client.database("store");
    let coll = db.collection("users");

    for collection_name in db.list_collection_names(None) {
        println!("{}", collection_name);
    }

    //let result = rt.block_on(coll.find_one(None, None));
    //println!("Result: {:?}", result);
}

/*
use mongodb::{Client, options::{ClientOptions, ResolverConfig}};
use mongodb::Database;
use bson::{doc, Document};
use std::env;
use std::error::Error;
use tokio;
*/