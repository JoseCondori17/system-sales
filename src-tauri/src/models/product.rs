use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Product{
    pub code: String,
    pub name: String,
    pub category: String,
    pub stock: u64,
    pub price: f64,
    pub available: u64,
}
