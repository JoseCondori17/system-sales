use serde::{Serialize, Deserialize};
use crate::models::shopping::Shopping;

#[derive(Debug, Serialize, Deserialize)]
pub struct Sale{
    pub datetime: String,
    pub payment_method: String,
    pub amount: f64,
    pub products: Vec<Shopping>,
    pub discount: u64,
}