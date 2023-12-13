use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Shopping{
    pub name: String,
    pub quantity: u16,
    pub previous_stock: i64,
    pub current_stock: i64,
    pub price: f64,
}