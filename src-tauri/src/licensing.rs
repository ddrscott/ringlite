use base64::{engine::general_purpose::STANDARD, Engine};
use ed25519_dalek::{Signature, Verifier, VerifyingKey};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;

// Public key for license verification (safe to embed in app)
// Generate keypair with: node -e "const c=require('crypto');const k=c.generateKeyPairSync('ed25519');console.log('PRIVATE:',k.privateKey.export({type:'pkcs8',format:'pem'}));console.log('PUBLIC:',k.publicKey.export({type:'spki',format:'pem'}))"
const PUBLIC_KEY_PEM: &str = r#"-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEA/zB2hOm8CL03USj+vw87fZYf/UOuVy45cQr/MZ6DWnw=
-----END PUBLIC KEY-----"#;

const MAX_FREE_USES: u32 = 10;

#[derive(Serialize, Deserialize, Default)]
struct AppData {
    use_count: u32,
    license_key: Option<String>,
    is_licensed: bool,
}

#[derive(Deserialize)]
struct LicenseData {
    payload: String,
    signature: String,
}

#[derive(Deserialize)]
struct LicensePayload {
    email: String,
    #[allow(dead_code)]
    timestamp: u64,
    product: String,
}

fn get_data_path() -> PathBuf {
    let data_dir = dirs::data_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("RingLite");
    fs::create_dir_all(&data_dir).ok();
    data_dir.join("app_data.json")
}

fn load_app_data() -> AppData {
    let path = get_data_path();
    fs::read_to_string(&path)
        .ok()
        .and_then(|s| serde_json::from_str(&s).ok())
        .unwrap_or_default()
}

fn save_app_data(data: &AppData) {
    let path = get_data_path();
    if let Ok(json) = serde_json::to_string_pretty(data) {
        fs::write(path, json).ok();
    }
}

pub fn verify_license_key(license_key: &str) -> Result<String, String> {
    // Decode the base64 license key
    let decoded = STANDARD
        .decode(license_key.trim())
        .map_err(|_| "Invalid license key format")?;

    let license_data: LicenseData =
        serde_json::from_slice(&decoded).map_err(|_| "Invalid license key structure")?;

    // Parse the payload to get the email
    let payload: LicensePayload =
        serde_json::from_str(&license_data.payload).map_err(|_| "Invalid license payload")?;

    if payload.product != "ringlite-pro" {
        return Err("Invalid product".to_string());
    }

    // Verify signature
    let signature_bytes = STANDARD
        .decode(&license_data.signature)
        .map_err(|_| "Invalid signature format")?;

    let signature =
        Signature::from_slice(&signature_bytes).map_err(|_| "Invalid signature length")?;

    // Parse public key from PEM
    let public_key = parse_public_key_from_pem(PUBLIC_KEY_PEM)?;

    public_key
        .verify(license_data.payload.as_bytes(), &signature)
        .map_err(|_| "Invalid signature")?;

    Ok(payload.email)
}

fn parse_public_key_from_pem(pem: &str) -> Result<VerifyingKey, String> {
    use ed25519_dalek::pkcs8::DecodePublicKey;
    VerifyingKey::from_public_key_pem(pem).map_err(|e| format!("Failed to parse public key: {}", e))
}

#[tauri::command]
pub fn get_license_status() -> (bool, u32, u32) {
    let data = load_app_data();
    (data.is_licensed, data.use_count, MAX_FREE_USES)
}

#[tauri::command]
pub fn increment_use_count() -> (bool, u32, u32) {
    let mut data = load_app_data();

    if !data.is_licensed {
        data.use_count += 1;
        save_app_data(&data);
    }

    (data.is_licensed, data.use_count, MAX_FREE_USES)
}

#[tauri::command]
pub fn activate_license(license_key: String) -> Result<String, String> {
    let email = verify_license_key(&license_key)?;

    let mut data = load_app_data();
    data.license_key = Some(license_key);
    data.is_licensed = true;
    save_app_data(&data);

    Ok(email)
}

#[tauri::command]
pub fn should_show_nag() -> bool {
    let data = load_app_data();
    !data.is_licensed && data.use_count >= MAX_FREE_USES
}
